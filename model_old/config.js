const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  value: { default: null },
 
});

module.exports = mongoose.model("Config", userSchema);











               
