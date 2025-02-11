const jwt=require('jsonwebtoken')
const AdminModel = require('../models/Admin');

const checkAdminAuth=async(req,res,next)=>{
    // console.log("middleware auth")
    const {token}=req.cookies; //token get
    // console.log(token)
    if(!token){
        req.flash('error','Unaouthrized Login')
        res.redirect('/')

    }else{
        const data =jwt.verify(token,'anuragkushwah15394584728655hgbdhjdn')
        //get data
        const Admindata=await AdminModel.findOne({_id:data.ID});
        // console.log(Userdata)
        req.Admindata=Admindata
        next();
    }
}

module.exports=checkAdminAuth