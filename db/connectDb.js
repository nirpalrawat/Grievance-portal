const mongoose = require("mongoose");
const Live_URL =
  "mongodb+srv://anuragkofficial21:ram123@cluster0.r3sc4oj.mongodb.net/graviancePoratl?retryWrites=true&w=majority";
const Local_URL = "mongodb://127.0.0.1:27017/grievanceportal";

const connectDb = () => {
  return mongoose.connect(Local_URL)
//   return mongoose.connect(Live_URL)
    .then(() => {
      console.log("connect successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDb;
