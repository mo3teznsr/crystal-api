var express = require('express');
var router = express.Router();
const Wishlist=require('../model_old/wishlist')
const Property=require('../model_old/property')
const auth=require('../middleware/auth');

router.post('/:id',auth,async function(req, res, next){
try{
    var old=await Wishlist.findOne({property:req.params.id,user:req.user.id})
    if(old)
    {
        await Wishlist.deleteOne({property:req.params.id,user:req.user.id})
        return res.json({message:"Successfuly removed"})
    }
    else 
    {
        await Wishlist.create({property:req.params.id,user:req.user.id} );
        return res.json({message:"Successfuly created"})
    }



}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.get('/',auth,async function(req, res, next){
    try{
   var list= await Wishlist.find({user:req.user.id} );
    
    return res.json(list)
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json(e.message)
    }
    })


    router.get('/details',auth,async function(req, res, next){
        try{
       var list= await Wishlist.find({user:req.user.id} );
       var ids=[]
       for(let i=0;i<list.length;i++)
       {
        ids.push(list[i].property)
       }

       var properties= await Property.find({_id:{$in:ids}}).populate(['amenities','category']).sort({createdAt:-1})
        return res.json(properties)
        }
        catch(e)
        {
            console.log(e)
            return res.status(500).json(e.message)
        }
        })



module.exports = router;