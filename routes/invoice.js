var express = require('express');
var router = express.Router();
const Model = require("../config/server").Invoice;


router.post('/',async function(req, res, next){
try{
   
if(req.body.id)
{
    await Model.update(req.body,{where:{id:req.body.id}})
    
    return res.json({message:"Successfuly updated"})
}
//const invoices=await Model.findAll({where:{user_id:req.body.user_id}}).count()
var property=await Model.create(req.body );

return res.json({message:"Successfuly created",property})
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
            $item= await Model.findByPk(id)

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

$cities=await Model.findAll({order: [
    ['id', 'DESC'],]})
return res.json($cities )
});


module.exports = router;