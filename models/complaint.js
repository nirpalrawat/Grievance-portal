const mongoose = require("mongoose");

const Complaintschema = new mongoose.Schema(
  {
    comptitle: {
      type: String,
      Required: true,
    },
    semester: {
      type: String,
      Required: true,
    },
    course: {
      type: String,
      Required: true,
    },
    rollnumber: {
      type: String,
      Required: true,
    },
    complaint: {
      type: String,
      Required: true,
    },
    course: {
      type: String,
      Required: "course",
    },
    user_id: {
      type: String,
      Required: "complaint",
    },
    status: {
      type: String,
      default: "panding",
    },
    comment: {
      type: String,
      default: "panding",
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
const ComplaintModel = mongoose.model("complaint", Complaintschema);

module.exports = ComplaintModel;
