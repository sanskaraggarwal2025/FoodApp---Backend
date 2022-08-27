const express = require("express");
const bookingRouter = express.Router();
const {protectRoute} = require('../controller/authController');
const {createSession} = require('../controller/bookingController');
bookingRouter.post('/createSession',protectRoute,createSession);

bookingRouter.get('/createSession',function(req,res){
 res.sendFile("./booking.html",{root:__dirname});
  
})

module.exports = bookingRouter;