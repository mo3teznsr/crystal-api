const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  icon: { type: String},
  name_ar:{type:String},
  name_en:{type:String}
});


module.exports = mongoose.model("Amenity", attributeSchema);