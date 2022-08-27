const mongoose  = require("mongoose");

//establishing connection
const db_link = '';//database link
mongoose.connect(db_link)
 .then(function (db) {
  // console.log(db);
  console.log('plan db connected');
 })
 .catch(function (err) {
  console.log(err);
 })

//making schema
const planSchema = new mongoose.Schema({
 name:{
 type:String,
 required:true,
 unique:true,
 maxLength:[20,'name should not exceed more than 20 characters']
 },
 duration:{
  type:Number,
  required:true
 },
 price:{
  type:Number,
  required:[true,'price not entered']
 },
 ratingsAverage:{
  type:Number
 },
 discount:{
  type:Number,
  validate:[function(){
   return this.discount<100
  },'discount should not exceed price']
 }
})

const planModel = mongoose.model('planModel',planSchema);

// (async function createPlan(){
//  let planObj = {
//   name:"Sea Food",
//   duration:40,
//   price:8000, 
//   ratingsAverage:17,
//   discount:12
//  }
//  let data = await planModel.create(planObj);
//  console.log(data);
// })();

module.exports = planModel;