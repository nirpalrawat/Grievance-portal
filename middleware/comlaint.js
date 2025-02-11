const jwt = require("jsonwebtoken");
const ComplaintModel = require("../models/complaint");

const checkCompAuth = async (req, res, next) => {
  // console.log("middleware auth")
  const { token } = req.cookies; //token get
  // console.log(token)
  if (!token) {
    req.flash("error", "Unaouthrized Login");
    res.redirect("/");
  } else {
    const data = jwt.verify(token, "anuragkushwah15394584728655hgbdhjdn");
    //get data
    const Complaintdata = await ComplaintModel.findOne({ _id: data.ID });
    // console.log(Userdata)
    req.Complaint = Complaintdata;
    next();
  }
};

module.exports = checkCompAuth;
