var express = require('express');
var router = express.Router();
const Model = require("../config/server").Package;


router.post('/',async function(req, res, next){
try{
    if(req.body.id)
{
    const item=await Model.findByPk(req.body.id)
    item.name_en=req.body.name_en
    item.name_ar=req.body.name_ar
    item.serviceId=req.body.serviceId
    item.price=req.body.price
    item.image=req.body.image 
    item.discount=req.body.discount 
    item.is_active=req.body.is_active
    item.Months=req.body.Months 
    item.qty=req.body.qty
    item.save()
    return res.json(item)
}
var city= Model.create(req.body );
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


await Model.findOneAndUpdate({id:req.params.id},req.body)





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
            $item= await Model.findById(id)

            return   res.json($item)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
    $items=await Model.findAll()
    return res.json($items )
});


router.get('/',async function(req, res, next) {

$cities=await Model.findAll({})
return res.json($cities )
});


module.exports = router;