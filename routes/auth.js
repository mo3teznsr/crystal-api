const Otp= require('../model_old/otp')
const jwt=require('jsonwebtoken')
const axios = require("axios");
var express = require('express');
var router = express.Router();
require('dotenv').config()
const auth=require('../middleware/auth');
const User = require("../config/server").User;
var bcrypt=require('bcryptjs')


/* GET users listing. */
router.post('/login',async(req,res)=>{
  const { mobile, password } = req.body;

  // Validate user input
  if (!(mobile && password)) {
  return  res.status(400).send("All input is required");
  }
  try
  {
  const user = await User.findOne({where:{ mobile }});

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      {id:user.id},
      process.env.TOKEN_KEY,
      
    );
    // save user token
    // user
 return   res.status(200).json(token);
  }
 return res.status(400).send("Invalid Credentials");
} catch (err) {
  console.log(err)
  res.status(400).json(err.message)
}
 

});
router.post('/register',async(req,res)=>{
  try {
    // Get user input
    const {email, name, mobile, password } = req.body;

    // Validate user input 
    // if (!(email&&mobile && password && name && gender&&city)) {
    //   res.status(400).send("All input are required");
    // }

    // check if user already exist
    // Validate if user exist in our database
    const oldMobile = await User.findOne({ mobile });
    if (oldMobile) {
      return res.status(409).send({mobile:"validation.mobileExists"});
    }
    const oldEmail = await User.findOne({ mobile });
    if (oldEmail) {
      return res.status(409).send({email:"validation.emailExists"});
    }
    //   // const token = jwt.sign(
    //   //   { id: oldUser._id },
    //   //   process.env.TOKEN_KEY
    //   // );
    //   // save user token
    //   // return new user
    // //  res.status(200).json(token);
    //   return res.status(409).send("Email Already Exist. Please Login");
    // }

   
    //   const mobileUser=await User.findOne({ mobile });
    //   if(mobileUser)
    //  {
    //    return res.status(409).send("Mobile Already Exist. Please Login");}
    // }


    //Encrypt user password
    encryptedPassword =  await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      email,
      mobile,
      name,
   //  gender, // sanitize: convert email to lowercase
     password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_KEY
     
    );
    // save user token


    // return new user
    res.status(200).json(token);
    
  } catch (err) {
    const {errors,fields}=err
    console.log(err);
    return res.status(409).send(err);
   
  }
});
/*
router.post('/', async(req, res, next)=> {

        // Get user input
       
        try {
          const Authtoken = req.headers["token"];
          if (!Authtoken) {
            return res.status(403).send("A token is required for authentication");
          }
          const {mobile} = jwt.verify(Authtoken, process.env.TOKEN_KEY);
          console.log(mobile)
          const oldUser = await User.findOne({ mobile :mobile});
    
          if (oldUser) {
              const token = jwt.sign(
                  {id:oldUser._id,mobile:mobile},
                  process.env.TOKEN_KEY
                );
            return res.send(token);
         }
      
          const user = await User.create({
            mobile: mobile, 
  
          });
      
          // Create token
          const token = jwt.sign(
              user,
              process.env.TOKEN_KEY
            );
        return res.json(token);
        } catch (err) {
          console.log(err)
          return res.status(401).send("Invalid Token");
        }
    
       
    
        // check if user already exist
        // Validate if user exist in our database
       
     
});
*/
router.get('/',auth,async function(req, res, next) {
  if(req.user.id)
 { 
  try {
    var user=await User.findById(req.user.id)
    delete user['password']
    res.send(user);
  }
  catch(e){
    res.status(401).send(null)
  }
  }
    else {
      res.status(401).send(null)
    }
  });

  router.post("/user",async function(req,res){

    const user=await User.findOne({mobile:req.mobile})
    return res.send(user??{})
  })

 router.post('/profile',auth,async function(req, res, next) {
  try{
    var user=await User.findById(req.user.id)
   for(let x in req.body)
   {
    if(req.body[x]&&x!='password')
    {
      user[x]=req.body[x]
    }
   }
  //  user.image=req.body.image;
  //  user.name=req.body.name;
  //  user.email=req.body.email;
   // user.mobile=req.body.mobile 
   await user.save().then(res=>{
      return res;
    }).catch(e=>{
      return `ERROR: ${e}`;
    })
  }
  catch(e){
console.log(e)
  }
  
    delete user['password']
      res.send(user);
    });



module.exports = router;