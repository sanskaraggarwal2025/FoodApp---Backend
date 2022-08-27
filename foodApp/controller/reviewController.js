const mongoose = require("mongoose");
const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");

module.exports.getAllReviews =async function getAllReviews(req,res){
 try{
     const reviews = await reviewModel.find();
     if(reviews){
        return res.json({
         message:"all reviews",
         data:reviews
        })
     }else{
      return res.json({
       message:"review not found"
      })
     }
 }
 catch(e){
  return res.json({
   message:e.message
  })
 }
} 

module.exports.top3reviews = async function top3reviews(req, res) {
 try {
  const reviews = await reviewModel.find().sort({
   ratings:-1
  }).limit(3);
  if (reviews) {
   return res.json({
    message: "all reviews",
    data: reviews
   })
  } else {
   return res.json({
    message: "review not found"
   })
  }
 }
 catch (e) {
  return res.json({
   message: e.message
  })
 }
}

module.exports.getPlanReview = async function getPlanReview(req, res) {
 try {
  let planid = req.params.id;
  const reviews = await reviewModel.find();
  reviews = reviews.filter(review => review.plan._id == planid);

  if (review) {
   return res.json({
    message: "all reviews of a particular plan",
    data: reviews
   })
  } else {
   return res.json({
    message: "review not found"
   })
  }
 }
 catch (e) {
  return res.json({
   message: e.message
  })
 }
} 

module.exports.createReview = async function createReview(req,res){
 try{
  let id = req.params.id;
  let plan = await planModel.findById(id);
  let review = await reviewModel.create(req.body);
  review.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2; 
  await review.save();
  res.json({
   message:"review created",
   data:review
  })
 }
 catch(err){
  return res.json({
   message:err.message
  })
 }
}

module.exports.updateReview = async function updateReview(req,res){
 let id = req.params.id;
 
 let dataToBeUpdated = req.body;
 let keys = [];
 for (let key in dataToBeUpdated) {
  keys.push(key);
 }
 let review = await reviewModel.findById(id);

 for (let i = 0; i < keys.length; i++) {
  review[keys[i]] = dataToBeUpdated[keys[i]];
 }
 await review.save();
 return res.json({
  message:"review updated succesfully",
  data:review
 })
}

module.exports.deleteReview = async function deleteReview(req, res) {
 try {
  let id = req.params.id;
  let review = await reviewModel.findByIdAndDelete(id);
  
  res.json({
   message: "review deleted",
   data: review
  })
 }
 catch (err) {
  return res.json({
   message: err.message
  })
 }
}
