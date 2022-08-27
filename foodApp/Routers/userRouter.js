const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const app = express()
app.use("/user",userRouter);
const cookieParse = require("cookie-parser");
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require('../controller/userController');
// const protectRoute = require("./authHelper");
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout} = require('../controller/authController');

//user ke options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)


userRouter
.route('/login')
.post(login);

userRouter
.route('/logout')
.get(logout);

userRouter
.route('/forgetpassword')
 .post(forgetpassword);

userRouter
.route('/resetpassword/:token')
.post(resetpassword);

//multer for file upload
const multerStorage = multer.diskStorage({
 destination:function(req,file,cb){
  cb(null,'public/images')
 },
 filename:function(req,res,cb){
  cb(null,`user-${Date.now()}.jpeg`);
 }
});

const filter = function(req,file,cb){
 if(file.mimetype.startsWith("image")){
  cb(null,true);
 }
 else{
  cb(new Error("Not an image ! Please upload an image"));  
 }
}

const upload = multer({
 storage:multerStorage,
 fileFilter:filter
})
userRouter.post("/profileImage", upload.single("photo"), updateProfileImage);

userRouter.get('/profileImage', (req, res) => {
 res.sendFile('C:\Users\Snskar\Desktop\Backend\foodApp\multer.html');
 // res.sendFile('foodApp\multer.html',{root:__dirname});
 
})
//profile page
app.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)



//admin specific work
app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)

module.exports = userRouter

