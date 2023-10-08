const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name_ar: { type: String, default: '' },
  name_en: { type: String, default: '' },
  photo: { type: String, default: null },
  active: { type: Boolean ,default:true},
});

module.exports = mongoose.model("City", userSchema);