const StudentModel = require("../../models/student");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CourseModel = require("../../models/course");

cloudinary.config({
  cloud_name: "dfoy70dri",
  api_key: "529319773434976",
  api_secret: "gnqQy8vKL-UAidGzN4WAp_5OZ2I",
});

class StudentController {
  static dashboard = async (req, res) => {
    try {
      const { name, email, phone, rollnumber,course,semester, image } = req.Userdata;
      res.render("admin/student/dashboard", {
        name: name,
        email: email,
        phone: phone,
        course:course,
        rollnumber: rollnumber,
        semester:semester,
        image: image,
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static display = async (req, res) => {
    try {
      const { name, image } = req.Admindata;
      const course=await CourseModel.find()
      const data = await StudentModel.find().sort({ _id: -1 });
      // console.log(data)
      res.render("admin/student/display", {
        d: data,
        name: name,
        image: image,
        course:course,
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentInsert = async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files.image);
      const file = req.files.image;
      //image upload cloudinary
      const imageUploaded = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "Studentprofile",
        }
      );
      // console.log(imageUploaded);
      const {
        name,
        email,
        phone,
        password,
        confirmpassword,
        dob,
        address,
        rollnumber,
        semester,
        course,
      } = req.body;
      const student = await StudentModel.findOne({ email: email });
      // console.log(result)
      if (student) {
        req.flash("error", "Email Alredy Exit🤦‍♀️");
        res.redirect("/admin/studentdisplay");
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new StudentModel({
              name: name,
              email: email,
              phone: phone,
              password: hashpassword,
              dob: dob,
              address: address,
              rollnumber: rollnumber,
              semester: semester,
              course: course,
              image: {
                public_id: imageUploaded.public_id,
                url: imageUploaded.secure_url,
              },
            });
            await result.save();
            res.redirect("/admin/studentdisplay");
          } else {
            req.flash("error", "password and confirm password not same");
            res.redirect("/admin/studentdisplay");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      if (email && password) {
        const student = await StudentModel.findOne({
          email: email,
        });
        // console.log(student);
        if (student != null) {
          const ismatched = await bcrypt.compare(password, student.password);
          if (ismatched) {
            //token genrate

            let token = jwt.sign(
              { ID: student.id },
              "anuragkushwah15394584728655hgbdhjdn"
            );
            // console.log(token);
            res.cookie("token", token);
            res.redirect("/admin/student/dashboard");
          }
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static viewstudent = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await StudentModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/student/view", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static editstudent = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await StudentModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/student/edit", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static updatestudent = async (req, res) => {
    try {
      const { id } = req.body;
      const {
        name,
        email,
        phone,
        password,
        dob,
        address,
        rollnumber,
        course,
      } = req.body;
      await StudentModel.findByIdAndUpdate(req.params.id, data);
      // console.log(req.body);
      // console.log(req.files.image)
      if (req.files) {
        const user = await StudentModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID)

        //deleting image from cloudinary

        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "Studentprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          phone: phone,
          password: password,
          dob: dob,
          address: address,
          rollnumber: rollnumber,
          course: course,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
          phone: phone,
          password: password,
          dob: dob,
          address: address,
          rollnumber: rollnumber,
          course: course,
        };
      }
      req.flash("success", "Update successfully");
      res.redirect("/admin/studentdisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static deletestudent = async (req, res) => {
    try {
      await StudentModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/studentdisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static studentlogout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  //update profile
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.Userdata;
      const { name, email, image } = req.body;
      // console.log(req.body);
      // console.log(req.files.image)
      if (req.files) {
        const user = await StudentModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID)

        //deleting image from cloudinary

        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "profileImage",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await StudentModel.findByIdAndUpdate(id, data);
      req.flash("success", "Profile Update successfully");
      res.redirect("/admin/student/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  //change password
  static updatePassword = async (req, res) => {
    try {
      // console.log(req.body)
      const { oldpassword, newpassword, confirmpassword } = req.body;
      const { id } = req.Userdata;
      if (oldpassword && newpassword && confirmpassword) {
        const student = await StudentModel.findById(id);
        const isMatched = await bcrypt.compare(oldpassword, student.password);
        console.log(isMatched);
        if (!isMatched) {
          req.flash("error", "Current password is incorrenct");
          res.redirect("/admin/student/dashboard");
        } else {
          if (newpassword != confirmpassword) {
            req.flash("error", "Password does not match");
            res.redirect("/admin/student/dashboard");
          } else {
            const newHashPassword = await bcrypt.hash(newpassword, 10);
            await StudentModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Update Successfully");
            res.redirect("/admin/student/dashboard");
          }
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/admin/student/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = StudentController;
