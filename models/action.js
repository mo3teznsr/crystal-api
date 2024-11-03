const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  type:{type:String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', },
},{timestamps:true});

module.exports = mongoose.model("Action", userSchema);