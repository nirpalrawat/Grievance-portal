const bcrypt = require("bcrypt");
const AdminModel = require("../../models/Admin");
const ComplaintModel = require("../../models/complaint");
// const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dfoy70dri",
  api_key: "529319773434976",
  api_secret: "gnqQy8vKL-UAidGzN4WAp_5OZ2I",
});
class Admincontrollers {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.Admindata;
      res.render("admin/dashboard", {
        name: name,
        image: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, email, image } = req.Admindata;
      res.render("admin/profile", {
        name: name,
        email: email,
        image: image,
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static admininsert = async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files.image);
      const file = req.files.image;
      //image upload cloudinary
      const imageUploaded = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "Adminprofile",
        }
      );
      // console.log(imageUploaded);
      const { name, email, password, confirmpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "Email Alredy Exit🤦‍♀️");
        res.redirect("/admin/studentdisplay");
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new AdminModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageUploaded.public_id,
                url: imageUploaded.secure_url,
              },
            });
            await result.save();
            res.redirect("/");
          } else {
            req.flash("error", "password and confirm password not same");
            res.redirect("/");
          }
        }
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        // console.log(admin);
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (ismatched) {
            //token genrate

            let token = jwt.sign(
              { ID: admin.id },
              "anuragkushwah15394584728655hgbdhjdn"
            );
            // console.log(token);
            res.cookie("token", token);
            res.redirect("/admin/dashboard");
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
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.Admindata;
      const { name, email, image } = req.body;
      // console.log(req.body);
      // console.log(req.files.image)
      if (req.files) {
        const admin = await AdminModel.findById(id);
        const imageID = admin.image.public_id;
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
      await AdminModel.findByIdAndUpdate(id, data);
      req.flash("success", "Profile Update successfully");
      res.redirect("/admin/profile");
    } catch (error) {
      console.log(error);
    }
  };
  //change password
  static updatePassword = async (req, res) => {
    try {
      // console.log(req.body)
      const { oldpassword, newpassword, confirmpassword } = req.body;
      const { id } = req.Admindata;
      if (oldpassword && newpassword && confirmpassword) {
        const admin = await AdminModel.findById(id);
        const isMatched = await bcrypt.compare(oldpassword, admin.password);
        console.log(isMatched);
        if (!isMatched) {
          req.flash("error", "Current password is incorrenct");
          res.redirect("/admin/profile");
        } else {
          if (newpassword != confirmpassword) {
            req.flash("error", "Password does not match");
            res.redirect("/admin/profile");
          } else {
            const newHashPassword = await bcrypt.hash(newpassword, 10);
            await AdminModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Update Successfully");
            res.redirect("/admin/profile");
          }
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/admin/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static update_status = async (req, res) => {
    try {
      const { status, comment } = req.body;
      // console.log(req.params.id);
      // console.log(status, comment);
      await ComplaintModel.findByIdAndUpdate(req.params.id, {
        comment: comment,
        status: status,
      });
      req.flash("success", "Status Update Succesfully");
      res.redirect("/complaint/complaintdashboard");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Admincontrollers;
