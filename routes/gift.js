var express = require('express');
var router = express.Router();
const Gift=require('../config/server').Gift
const auth=require('../middleware/auth');

const send_sms=require('../config/sms')

router.post('/',auth,async function(req, res, next){
try{
var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
await Gift.create({...req.body,userId:req.user.id, code} );

return res.json({message:"Successfuly created"})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.put('/:id',auth,async(req,res,next)=>{
try{

await Gift.findOneAndUpdate({id:req.params.id,userId:req.user.id},req.body,{new:true})

return res.json({message:"Successfuly updated"})

}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})
router.get('/:id',auth,async function(req, res, next) {
        var id=req.params.id
    if(id){
        try
        {
            amenities= await Gift.findByPk(id)

            return   res.json(amenities)
        }
        catch(e)
        {
            
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',auth,async function(req, res, next) {
amenities=await Gift.findAll({where:{userId:req.user.id}})
return res.json(amenities )
});

router.get('/all',auth,async function(req, res, next) {
amenities=await Gift.findAll({where:{}})
return res.json(amenities )
});


module.exports = router;