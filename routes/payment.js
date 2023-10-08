var express = require('express');
var router = express.Router();
const Payment = require("../model_old/payment");
const User = require("../model_old/user");
const auth=require('../middleware/auth');
/* GET users listing. */
router.get('/',auth,async function(req, res, next) {
  var payments= await Payment.find({user:req.user.id})
  res.send(payments);
});

router.post('/',auth,async function(req, res, next) {
  var user=await User.findById(req.user.id)
  var balance=user.balance*1??0;
  user.balance=balance*1+req.body.amount;
  await user.save();
   Payment.create({user:req.user.id,amount:req.body.amount,status:req.body.status,channel:"Paypal",trandsaction_id:req.body.id,trandsaction:req.body.trandsaction})
  res.send(user);
});

module.exports = router;
