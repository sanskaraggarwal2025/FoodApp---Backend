const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
   user: "",//author's mail
   pass: ""//generate password from security tab of your account
  },
 });
 var Osubject, Ohtml;
 if (str == "signup") {
  Osubject = `Thank you for signing ${data.name}`;
  Ohtml = `
<h1> Welcome to FoodApp.com</h1>
Here are your details-
Name- ${data.name}
Email - ${data.email}
 `
 }
 else if (str == "resetpassword") {
  Osubject = `Reset Password`;
  Ohtml = `
 <h1>FoodApp.com</h1>
 here is your link to reset your password!
 ${data.resetPasswordLink}
 `
 }

 let info = await transporter.sendMail({
  from: '"FoodApp" <>',//put the mail id
  to: data.email, //mail id from user side
  subject: Osubject,
  html: Ohtml,
 });



}