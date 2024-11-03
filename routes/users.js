var express = require('express');
var router = express.Router();
const auth=require('../middleware/auth');
const User = require("../config/server").User;
var bcrypt=require('bcryptjs')
/* GET users listing. */
router.get('/', async(req, res, next)=> {
const users=await User.findAll(); 
  res.json(users);
});
router.post('/', async(req, res, next)=> {
  const {name,email,role_id,mobile,code,password,company_id,id}=req.body

  if(id)
  {

  const encryptedPassword =  await bcrypt.hash(password, 10);
  await User.update( {name,email,role_id,mobile,company_id,code,...(password&&{password:encryptedPassword})},{where:{id:req.body.id}});
  }else{

  const encryptedPassword =  await bcrypt.hash(password, 10);
  await User.create( {name,email,role_id,mobile,company_id,code,...(password&&{password:encryptedPassword})});
  }

    res.json([]);
  });

module.exports = router;
