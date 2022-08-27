const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken")
// const JWT_KEY = require("secrets.js");
const userModel = require("../models/userModel")
authRouter
 .route('/signup')
 .get(getSignUp)
 .post(postSignUp)

authRouter
 .route('/login')
 .post(loginUser)


function getSignUp(req, res) {
 res.sendFile('foodApp\public\index.html', { root: __dirname })
}

async function postSignUp(req, res) {
 let dataObj = req.body;
 let user = await userModel.create(dataObj);
 res.json({ 
  message: "user added",
  data: user
 })
}

async function loginUser(req,res){
 try{
  let data = req.body;
  let user  = await userModel.findOne({email:data.email});
  if(user){
   //bcrypt ka compare function use hoga 
   if(user.password == data.password){
    let uid = user['_id'];//uid
    let token = jwt.sign({payload:uid},JWT_KEY);
    res.cookie('login', token);
    return res.json({
     message:'user has logged in',
     userDetails:data
    })
    
   }
   else{
    return res.json({
     message: "wrong credentials"
    })
   }
  }
  else{
   return res.json({
    message:"user not found"
   })
   
  }
 }
 catch(err){
  return res.json({
   message:"err"
  })
 }
}
module.exports = authRouter