const Otp= require('../config/server').Otp
const jwt=require('jsonwebtoken')
const axios = require("axios");
var express = require('express');
var router = express.Router();
require('dotenv').config()
const auth=require('../middleware/auth');
const User = require("../config/server").User;
var bcrypt=require('bcryptjs')

const send_sms=(mobile, message)=>{
  //var myHeaders = new Headers();
  const myHeaders={"Content-Type": "application/json",
  "Authorization": "Bearer i4WTrOvvFpIKJbgMcCWO"};
  
  var raw = JSON.stringify({
    "src": "Crystal",
    "dests": [
      "966"+mobile
    ],
    "body": message,
    "priority": 0,
    "delay": 0,
    "validity": 0,
    "maxParts": 0,
    "dlr": 0,
    "prevDups": 0,
    "msgClass": "promotional"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  axios.post("https://api.oursms.com/msgs/sms", {
    "src": "Crystal",
    "dests": [
      "966"+mobile
    ],
    "body": message,
    "priority": 0,
    "delay": 0,
    "validity": 0,
    "maxParts": 0,
    "dlr": 0,
    "prevDups": 0,
    "msgClass": "promotional"
  },{headers:myHeaders})
   
    
  
  }
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
 return   res.status(200).json({token,user});
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
    const oldMobile = await User.findOne({where:{ mobile }});
    if (oldMobile) {
      return res.status(409).send({mobile:"validation.mobileExists"});
    }
    const oldEmail = await User.findOne({where:{ email }});
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
      { id: user.id },
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

router.post('/send-otp',async(req,res)=>{
 
    // Get user input
    const {mobile } = req.body;

    const oldMobile = await User.findOne({where:{ mobile }});
    if(!oldMobile)
    {
      return res.status(400).send("لم يتم العثور على الرقم الذي أدخلته");
    }
    const otp=Math.floor(100000+Math.random()*900000)
    const otp_obj=await Otp.create({mobile,code:otp})
    const message = `كود التفعيل الخاص بك هو ${otp}`
    send_sms(mobile, message)
    return res.status(200).send("تم ارسال الكود الى رقم الجوال");
  });

  router.post('/reset',async(req,res)=>{
 
    // Get user input
    const {mobile,otp,password } = req.body;

    const user = await User.findOne({where:{ mobile }});
    if(!user)
    {
      return res.status(400).send("لم يتم العثور على الرقم الذي أدخلته");
    }
    const otp_obj=await Otp.findOne({where:{mobile:mobile,code:otp}})
    if(!otp_obj)
    {
      return res.status(400).send("الكود الذي أدخلته غير صحيح");
    }
    const encryptedPassword =  await bcrypt.hash(password, 10);
    user.password=encryptedPassword;
    user.save()
   
    return res.status(200).send(" تم تغيير كلمة المرور بنجاح");
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
    var user=await User.findByPk(req.user.id)
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