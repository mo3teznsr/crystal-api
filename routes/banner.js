var express = require('express');
var router = express.Router();
const Model = require("../config/server").Banner;


router.post('/',async function(req, res, next){
try{
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


const item= await Model.findByPk(req.params.id)
  item.image=req.body.image
item.isActive=req.body.isActive
item.save()





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

$cities=await Model.findAll()
return res.json($cities )
});

router.delete('/:id',async function(req, res, next) {
    const item= await Model.findByPk(req.params.id)
    item.destroy()
    return res.json({message:"Successfuly deleted"})
})


module.exports = router;