const express = require("express");
const planRouter=express.Router();

const{protectRoute, isAuthorised} = require('../controller/authController');
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plans } = require("../controller/planController");
//all plans leke ayega
planRouter
.route('/allplans')
.get(getAllPlans)


//user owned plan
planRouter.use(protectRoute);
planRouter
.route('/plan/:id')
.get(getPlan)


//admin, restaurant owner can only create,delete and update plans
// planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan)

// planRouter.use(isAuthorised['admin', 'restaurantowner']);
planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/topplans')
 .get(top3Plans)

module.exports = planRouter;
//top3