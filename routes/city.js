var express = require('express');
var router = express.Router();
const City=require('../model_old/city')


router.post('/',async function(req, res, next){
try{
const {name_ar,name_en}=req.body 
var city= City.create({name_ar,name_en});

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


await City.findOneAndUpdate({_id:req.params.id},req.body,{new:true})





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
            $city= await City.findById(id)

            return   res.json($city)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
    $cities=await City.find()
    return res.json($cities )
});


router.get('/',async function(req, res, next) {

$cities=await City.find()
return res.json($cities )
});


module.exports = router;