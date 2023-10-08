const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  mobile: { type: String, unique: true },
  email: { type: String},
  password:{type:String},
  role: { type: String ,default:"customer"},
  photo:{type:String},
  image:{type:String},
  gender:{type:String},
  city:{type:String},
  balance:{type:Number,default:20}
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);