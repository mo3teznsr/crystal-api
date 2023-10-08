var express = require('express');
var router = express.Router();
const db=require('../config/server')


router.post('/',async function(req, res, next){
try{

await Amenity.create(req.body );

return res.json({message:"Successfuly created"})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.put('/:id',async(req,res,next)=>{
try{


await Amenity.findOneAndUpdate({_id:req.params.id},req.body,{new:true})





return res.json({message:"Successfuly updated"})

}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})
router.get('/:id',async function(req, res, next) {
        var id=req.params.id
    if(id){
        try
        {
            amenities= await Amenity.findById(id)

            return   res.json(amenities)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',async function(req, res, next) {

amenities=await db.Country.findAll()
return res.json(amenities )
});


module.exports = router;