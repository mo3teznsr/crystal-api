var express = require('express');
var router = express.Router();
const Address=require('../config/server').Review
const auth=require('../middleware/auth');

router.post('/',auth,async function(req, res, next){
try{
await Address.create({...req.body,user_id:req.user.id} );
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

const review=await Address.findOne({id:req.params.id,user_id:req.user.id})
if(review)
{
    review.review=req.body.review;
    review.comment=req.body.comment
    await review.save();
}


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
            amenities= await Address.findOne({where:{order_id:id,user_id:req.user.id}})

            return   res.json(amenities)
        }
        catch(e)
        {
            
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',auth,async function(req, res, next) {
amenities=await Address.findAll({})
return res.json(amenities )
});


module.exports = router;