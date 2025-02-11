const CourseModel = require("../../models/course");

class CourseController {
  static courseDashboard = async (req, res) => {
    try {
      const { name, image,course } = req.Admindata;
      const data = await CourseModel.find().sort({ _id: -1 });
      // console.log(data)
      res.render("admin/course/courseDashboard", {
        d: data,
        name: name,
        image: image,
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static CourseInsert = async (req, res) => {
    try {
      const { email, course } = req.body;
      const result = new CourseModel({
        email: email,
        course: course,
      });
      await result.save();
      res.redirect("/admin/course/courseDashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static viewsCourse = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await CourseModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/course/view", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteCourse = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await CourseModel.findByIdAndDelete(req.params.id);
      // console.log(data)
      res.render("admin/course/courseDashboard", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static updateCourse = async (req, res) => {
    try {
      const { email, course } = req.body;
      await CourseModel.findByIdAndUpdate(req.params.id, data);
      var data = {
        email: email,
        course: course,
      };
      req.flash("success", "Update successfully");
      res.redirect("/admin/course/courseDashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static editCourse = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, image } = req.Admindata;
      const data = await CourseModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/course/edit", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;
