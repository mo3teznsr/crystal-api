const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  city: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'City', },
  name_ar:{type:String},
  name_en:{type:String}
});


module.exports = mongoose.model("Area", attributeSchema);