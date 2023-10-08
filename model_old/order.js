const mongoose = require("mongoose");

const product = new mongoose.Schema({
  options: { type: Object, default:{} },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name:{type:String},
  price:{Type:Number},
  qty:{type:Number,default:1}
});

const addressSchema = new mongoose.Schema();


const userSchema = new mongoose.Schema({
  status: { type: String,default:"pending" },
  sub_total: { type: Number, required:true},
  user:{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User', },
  discount: { type: Number ,default:0},
  tax:{type:Number,default:0},
  products:[product],
  amount:{type:Number,required:true},
  address:addressSchema

});

module.exports = mongoose.model("Order", userSchema);