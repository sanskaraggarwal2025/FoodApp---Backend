const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//establishing connection
const db_link = '';//database link
mongoose.connect(db_link)
.then(function(db){
 // console.log(db);
 console.log('db connected');
})
.catch(function(err){
 console.log(err);
})


//making schema
const userSchema = mongoose.Schema({
 name:{
  type:String,
  required:true
 },
 email:{
  type:String,
  required:true,
  unique:true,
  validate:function(){
   return emailValidator.validate(this.email);
  }  
 },
 password:{
  type: String,
  required: true
 },
 confirmpassword:{
  type: String,
  required: true,
  validate:function(){
   return this.confirmpassword == this.password
  }
 },
 role:{
  type:String,
  enum:['admin','user','restaurantowner','deliveryboy'],
  default:'admin'
 },
 profileImage:{
  type:String,
  default:'img/users/default.jpeg'
 },
 resetToken:String
})

userSchema.pre('save',function(){
 this.confirmpassword = undefined;
})

userSchema.methods.createResetToken = function(){
 //creating unique token using crypto
 const resetToken = crypto.randomBytes(32).toString("hex");
 this.resetToken = resetToken;
 return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
 this.password = password;
 this.confirmPassword = confirmPassword;
 this.resetToken = undefined;
} 

// userSchema.pre('save',async function(){
//  let salt =await bcrypt.genSalt();
//  let hashedString =await bcrypt.hash(this.password,salt);
//  this.password = hashedString;
// })

//making the model
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;