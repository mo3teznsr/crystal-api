const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name_ar: { type: String, default: null },
  name_en: { type: String, default: null },
  image: { type: String, default: null },
  active: { type: Boolean ,default:true},
});

module.exports = mongoose.model("Category", userSchema);











               
