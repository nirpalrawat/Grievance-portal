const StudentModel = require("../models/student");
const CourseController = require("../models/course");
const Admincontrollers = require("../models/Admin");
const ComplaintController = require("../models/complaint");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");

class Frontcontrollers {
  static home = async (req, res) => {
    try {
      res.render("home", {
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };
  static grivence = async (req, res) => {
    try {
      res.render("grivence");
    } catch (error) {
      console.log(error);
    }
  };
  static benefit = async (req, res) => {
    try {
      res.render("benefit");
    } catch (error) {
      console.log(error);
    }
  };
  static feature = async (req, res) => {
    try {
      res.render("feature");
    } catch (error) {
      console.log(error);
    }
  };
  static help = async (req, res) => {
    try {
      res.render("help");
    } catch (error) {
      console.log(error);
    }
  };

  //forgotpasswordd

  static forgotpassword = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await StudentModel.findOne({ email: email });
      //   console.log(userData);
      if (userData) {
        const randomString = randomstring.generate();
        await StudentModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "Plz Check Your mail to reset Your Password!");
        res.redirect("/");
      } else {
        req.flash("error", "You are not a registered Email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email, token) => {
    // console.log(name,email)

    //connect with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "anuragkofficial21@gmail.com",
        pass: "bjlgmcajfhsvpwwz",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: ` For Varification mail`, // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:4000/reset-password?token=' +
        token +
        '">Reset</a>Your Password</p>.', // html body
    });
  };

  static reset_password = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await StudentModel.findOne({ token: token });
      if (tokenData) {
        res.render("reset-password", { user_id: tokenData._id });
      } else {
        res.render("404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static reset_password1 = async (req, res) => {
    try {
      const { password, user_id } = req.body;
      const newHashPassword = await bcrypt.hash(password, 10);
      await StudentModel.findByIdAndUpdate(user_id, {
        password: newHashPassword,
        token: "",
      });
      req.flash("success", "Reset Password Updated successfully ");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = Frontcontrollers;
