
const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
 // let allUsers = await userModel.find();
 let id = req.params.id;
 let user = await userModel.findById(id);
 if(user){
  return res.json(user);
 }else{
  return res.json({
   message:"user not found"
  })
 }

 // res.json({
 //  message: "all users",
 //  data: allUsers
 // });
}

// module.exports.postUser = function postUser(req, res) {
//  let user = req.body;
//  res.json({
//   message: "data recieved",
//   data: user
//  })
// }

module.exports.updateUser =async function  updateUser(req, res) {
 try{

  let id = req.params.id;
  let user = await userModel.findById(id);
  let dataToBeUpdated = req.body;
  if(user){
  const keys = []
  for(let key in dataToBeUpdated){
   keys.push(key);
  }

  for(let i = 0;i<keys.length; i++){
   user[keys[i]] =dataToBeUpdated[keys[i]];
  }

  const updatedData = await user.save();
  res.json({
   message: "data updated",
   data:user
  })
 }else{
  return res.json({
   message:"user not found"
  })
 }
}
catch(err){
 res.json({
  message:err.message,
 })
}
 // for (key in dataToBeUpdated) {
  //  users[key] = dataToBeUpdated[key];
  // }
 // 
}

module.exports.deleteUser =async function deleteUser(req, res) {
 try{

  let id = req.params.id;
  let user = await userModel.findByIdAndDelete(id);
  if(!user){
   res.json({
    message:"user not found"
   })
  }
  res.json({
   message: "data has been deleted",
   data:user
  })
 }
 catch(err){
  res.json({
   message:err.message,
  })
 }
}

module.exports.getAllUser =async function getAllUser(req, res) {

 let users = await userModel.find();
 if(users){
  res.json({
   message:'users retrieved',
   data:users
  })
 }
 res.send("user id recieved")
 // let paramId = req.params.id;
 // let obj = {}
 // for (let i = 0; i < users.length; i++) {
 //  if (user[i]['id'] == paramId) {
 //   obj = users[i];
 //  }
 // }

 // res.json({
 //  message: "data recieved",
 //  data: obj
 // })
}

module.exports.updateProfileImage = function updateProfileImage(req,res){
 res.json({
  message:"file uploaded"
 })
}

// function setCookies(req, res) {
//  res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//  res.cookie('isPrimeMember', true);
//  res.send('cookies has been sent');
// }

// function getCookies(req, res) {
//  let cookies = req.cookies.isLoggedIn;
//  console.log(cookies);
//  res.send("cookies recieved");
// }
