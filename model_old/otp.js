const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  code: { type: String, required: true },
  mobile: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("Otp", userSchema);