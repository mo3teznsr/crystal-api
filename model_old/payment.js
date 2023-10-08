const mongoose = require("mongoose");


const PaymentSchema = new mongoose.Schema({
  status: { type: String,default:"pending" },
  user:{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User', },
  channel:{ type:"String", required: false, },
  amount:{type:Number,required:true},
  trandsaction_id:{type:String},
  trandsaction:{Type:Object}
},{timestamps:true});

module.exports = mongoose.model("Payment", PaymentSchema);