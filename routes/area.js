var express = require('express');
var router = express.Router();
const Area=require('../model_old/area')


router.post('/',async function(req, res, next){
try{

await Area.create(req.body );

return res.json({message:"Successfully created"})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.put('/:id',async(req,res,next)=>{
try{


await Area.findOneAndUpdate({_id:req.params.id},req.body,{new:true})





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
            areas= await Area.findById(id)

            return   res.json(areas)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',async function(req, res, next) {

areas=await Area.find()
return res.json(areas )
});


module.exports = router;