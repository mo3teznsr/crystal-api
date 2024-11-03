var express = require('express');
var router = express.Router();
const Model=require('../config/server').Vehicle
const auth=require('../middleware/auth');

router.post('/',auth,async function(req, res, next){
try{
await Model.create({...req.body,userId:req.user.id} );
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

await Model.findOneAndUpdate({id:req.params.id,userId:req.user.id},req.body,{new:true})

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
            amenities= await Model.findOne({where:{id},include:['brand' ,'model']})

            return   res.json(amenities)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',auth,async function(req, res, next) {
amenities=await Model.findAll({where:{userId:req.user.id}, include: ['brand' ,'model']})
return res.json(amenities )
});


module.exports = router;