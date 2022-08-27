let SK = "" //put secret key from stripe api 
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel');
const userModel = require('../models/userModel');

module.exports.createSession = async function createSession(req,res){
 try{
  let userId = req.id;
  let planId = req.params.id;


  const user =  await userModel.findById(userId);
  const plan =  await planModel.findById(planId);

  const session = await stripe.chechkout.sessions.create({
   payment_method_types :['card'],
   customer_email:user.email,
   client_reference_id:plan.id,
   line_items: [
    {
     name:plan.name,
     description:plan.description,
     amount:plan.price,
     currency:"inr",
     quantity: 1
    }
   ],
   success_url: `${req.protocol}://${req.get("host")}/profile`,
   cancel_url: `${req.protocol}://${req.get("host")}/profile`
  })
  res.status(200).json({
   status:"success",
   session
  })
 }
 catch(e){
  res.status(500).json({
   message:e.message
  })
 }
}