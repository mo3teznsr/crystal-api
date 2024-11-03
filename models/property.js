const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  name: { type: String, default: null },
  details:{type:String},
  category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category', },
  area: { type: String },
  price: { type: Number, required: true,default:0 },
  images: { type: Array ,default:[]},
  amenities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity', }],
  keywords:{type:String},
  video:{type:String},
  lat:{type:Number},
  lng:{type:Number},
  photo:{type:String},
  type:{type:String},
  per:{type:String},
  city:{type: String},
  active: { type: Boolean, default: true, },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
},{timestamps:true});

module.exports = mongoose.model("Property", schema);