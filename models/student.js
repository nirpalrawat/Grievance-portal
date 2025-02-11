const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
    
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    rollnumber: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
      token: {
        type: String,
      },
      is_verified:{
        type:Number,
        default:0,
      }
    },
    
     { timestamps: true }
  );
  const StudentModel = mongoose.model("student", StudentSchema);
  module.exports= StudentModel;