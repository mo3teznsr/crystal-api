var express = require('express');
var router = express.Router();
const Category=require('../model_old/category')


router.post('/',async function(req, res, next){
try{

await Category.create(req.body);

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


await Category.findOneAndUpdate({_id:req.params.id},req.body,{new:true})

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
            $city= await Category.findById(id)
            return   res.json($city)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',async function(req, res, next) {

$cities=await Category.find()
return res.json($cities )
});


module.exports = router;