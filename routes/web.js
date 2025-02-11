const express = require("express");
const Frontcontrollers = require("../controllers/Frontcontrollers");
const Admincontrollers = require("../controllers/admin/Admincontrollers");
const StudentController = require("../controllers/admin/StudentController");
const CourseController = require("../controllers/admin/CourseController");
const checkUserAuth = require("../middleware/auth");
const checkAdminAuth = require("../middleware/adminAuth");
const checkCompAuth = require("../middleware/comlaint");
const ComplaintController = require("../controllers/admin/ComplaintController");


const route = express.Router();

//route localhost:4000

route.get("/", Frontcontrollers.home);
route.get("/about", checkUserAuth, Frontcontrollers.about);
route.get("/grivence", checkUserAuth, Frontcontrollers.grivence);
route.get("/benefit", checkUserAuth, Frontcontrollers.benefit);
route.get("/feature", checkUserAuth, Frontcontrollers.feature);
route.get("/help", checkUserAuth, Frontcontrollers.help);
route.get("/contact", Frontcontrollers.contact);

//adminpart
route.get("/admin/dashboard", checkAdminAuth, Admincontrollers.dashboard);
route.post("/admininsert", Admincontrollers.admininsert);
route.post("/adminverifylogin", Admincontrollers.verifylogin);

//update profile and password
route.post("/updateprofile", checkAdminAuth, Admincontrollers.updateProfile);
route.post("/updatepassword", checkAdminAuth, Admincontrollers.updatePassword);

//admin/studentstudet
route.get(
  "/admin/student/dashboard",
  checkUserAuth,
  StudentController.dashboard
);
route.get("/admin/studentdisplay", checkAdminAuth, StudentController.display);
route.get("/admin/studentview/:id",checkAdminAuth,StudentController.viewstudent);
route.get("/admin/studentdelete/:id",checkAdminAuth, StudentController.deletestudent);
route.get( "/admin/studentedit/:id", checkAdminAuth, StudentController.editstudent);
route.post( "/admin/studentupdate/:id",checkAdminAuth,StudentController.updatestudent);
route.get("/admin/profile", checkAdminAuth, Admincontrollers.profile);
route.post("/verifylogin", StudentController.verifylogin);
route.get("/logout", StudentController.studentlogout);

//complaint Controller
route.post("/complaintInsert",checkCompAuth, ComplaintController.complaintInsert);
route.get("/complaint/complaintdashboard",checkAdminAuth, ComplaintController.complaintDashboard);
route.get("/complaint/view/:id",checkAdminAuth, ComplaintController.viewComplaint);
route.get("/admin/student/comp_Status",checkUserAuth, checkCompAuth, ComplaintController.comp_Status);

//admin view
route.get("/admin/student/view", StudentController.viewstudent);
//admin student insert
route.post("/admin/studentInsert", StudentController.StudentInsert);

//update profile and password
route.post("/updateProfile", checkUserAuth, StudentController.updateProfile);
route.post("/updatePassword", checkUserAuth, StudentController.updatePassword);

//course controller
route.get("/admin/course/courseDashboard",checkAdminAuth, CourseController.courseDashboard);
route.post("/admin/courseInsert", CourseController.CourseInsert);
route.get("/admin/courseview/:id",checkAdminAuth,CourseController.viewsCourse);
route.get("/admin/coursedelete/:id", CourseController.deleteCourse);
route.get( "/admin/courseedit/:id", checkAdminAuth, CourseController.editCourse);
route.post( "/admin/courseupdate/:id",checkAdminAuth,CourseController.updateCourse);
route.post("/admin/update_status/:id",checkUserAuth, Admincontrollers.update_status)

//forgotpassword
route.post("/forgotpassword",Frontcontrollers.forgotpassword);
route.get("/reset-password",Frontcontrollers.reset_password);
route.post("/reset_password1",Frontcontrollers.reset_password1);


module.exports = route;
