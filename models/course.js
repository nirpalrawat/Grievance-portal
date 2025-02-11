const mongoose = require("mongoose");

const Courseschema = new mongoose.Schema(
  {
    email: {
      type: String,
      Required: true,
    },
    course: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const CourseModel = mongoose.model("course", Courseschema);

module.exports = CourseModel;
