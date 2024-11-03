var express = require('express');
var router = express.Router();
const Area=require('../config/server').Area
const Address=require('../config/server').Address

router.post('/',async function(req, res, next){
try{
if(req.body.id)
{
  const area=  await Area.findByPk(req.body.id);
  area.name_ar=req.body.name_ar
  area.name_en=req.body.name_en
  area.save()

}
else{
    await Area.create(req.body);
}


return res.json({message:"Successfully created"})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.delete('/:id',async function(req, res, next){
    try{

       await Area.destroy({where:{id:req.params.id}});

      await Address.destroy({where:{area_id:req.params.id}})
    
    
    
    return res.json({message:"Successfully delete"})
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

areas=await Area.findAll({})
return res.json(areas )
});


module.exports = router;