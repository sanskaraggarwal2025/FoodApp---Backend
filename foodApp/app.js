const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const JWT_KEY = require('../secrets');
app.use(express.json());
app.listen(3000);
app.use(cookieParser())

// let users = [
//  {
//   'id': 1,
//   'name': "Abhishek"
//  },
//  {
//   id: 2,
//   'name': "Abhinav"
//  },
//  {
//   'id': 3,
//   'name': "Sanskar"
//  }
//]

//mini app
const userRouter = require("./Routers/userRouter"); 
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter = require("./Routers/bookingRouter");
app.use('/user',userRouter);
app.use('/plans', planRouter); 
app.use('/review', reviewRouter); 
app.use('/booking',bookingRouter);





