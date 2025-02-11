const cloudinary = require("cloudinary").v2;
const ComplaintModel = require("../../models/complaint");

cloudinary.config({
  cloud_name: "dfoy70dri",
  api_key: "529319773434976",
  api_secret: "gnqQy8vKL-UAidGzN4WAp_5OZ2I",
});

class ComplaintController {
  static complaintInsert = async (req, res) => {
    try {
      //   console.log(req.files.image);
      const file = req.files.image;
      //image upload cloudinary
      const imageUploaded = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "ComplaintImage",
        }
      );
      const { comptitle, semester, course, rollnumber, complaint } = req.body;
      const Complaint = new ComplaintModel({
        comptitle: comptitle,
        semester: semester,
        course: course,
        rollnumber: rollnumber,
        complaint: complaint,
        image: {
          public_id: imageUploaded.public_id,
          url: imageUploaded.secure_url,
        },
      });
      await Complaint.save();
      req.flash("success", "Complaint Register Successfuly");
      res.redirect("admin/student/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static complaintDashboard = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { image, name } = req.Admindata;
      const data = await ComplaintModel.find();
      // console.log(data)
      res.render("complaint/complaintdashboard", {
        d: data,
        image: image,
        name: name,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static viewComplaint = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await ComplaintModel.findById(req.params.id);
      // console.log(data)
      res.render("complaint/view", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static comp_Status = async (req, res) => {
    try {
      const { semester, course, rollnumber } = req.Userdata;
      const data = await ComplaintModel.find();
      const comp = await ComplaintModel.find();
      // console.log(data)
      res.render("admin/student/comp_Status", {
        c: comp,
        d: data,
        semester: semester,
        course: course,
        rollnumber: rollnumber,
        msg: req.flash("success"),
      });
      req.flash("success", "Complaint Register Successfuly");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = ComplaintController;
