const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_KEY= '';//put your jwt key here
const userModel = require("../models/userModel")
const {sendMail} = require("../utility/nodemailer");

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup",user);
        if (user) {
            res.json({
                message: "user added",
                data: user
            })
        }
        else {
            res.json({
                message: "error while signup"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {

            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt ka compare function use hoga 
                if (user.password == data.password) {
                    let uid = user['_id'];//uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'user has logged in',
                        userDetails: data
                    })

                }
                else {
                    return res.json({
                        message: "wrong credentials"
                    })
                }
            }
            else {
                return res.json({
                    message: "user not found"
                })
            }

        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
}

//isAuthorised function to check the users role
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.json({
                message: "user not allowed"
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {

        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message: "user not verified"
                })
            }

        }
        else{
            const client = req.get('User-Agent');
            if(client.includes("Mozilla") == true){
                return res.redirect('/login')
            }
            res.json({
                message:"please login"
            })
        }
    }
    catch (err) {
        message: err.message;
    }
}

//forget password
module.exports.forgetpassword = async function forgetpassword(req,res){
    let {email} = req.body;
    try{
        const user = await userModel.findOne({email:email});
        if(user){

            //createResetToken is defined in userModel
            const resetToken = user.createResetToken();
            // http://abc.com/resetpassword/resetToken 
            let resetPasswordLink = `${req.protocol}://${req.get(
                "host"
            )}/resetpassword/${resetToken}`
            //send the mail to the user using nodemailer
            let obj = {
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",obj);
        }
        else{
            return res.json({
                message: "please signup"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

//reset password
module.exports.resetpassword = async function resetpassword(req,res){
    try{

        const token = req.params.token;
        let {password,confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user){

            //resetPasswordHandler is defined in userModel
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.json({
                message:"password changed"
            })
        }else{
            res.json({
                message: "user not found"
            });
        }

    }
    catch(err){
        res.json({
            message: err.message
        });
    }

}

//logout
module.exports.logout = function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"user logged in succesfull"
    })
}