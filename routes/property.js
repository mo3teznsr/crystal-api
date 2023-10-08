var express = require('express');
var router = express.Router();
const Property=require('../model_old/property')
const auth=require('../middleware/auth');
const User=require('../model_old/user')
router.post('/',auth,async function(req, res, next){
try{
req.body.user=req.user.id
var property=await Property.create(req.body );
var user=await User.findById(req.user.id)
console.log(user)
user.balance=user.balance-20;
user.save();
return res.json({message:"Successfuly created",property})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.get('/me',auth,async(req,res)=>{
    var properties=await Property.find({user:req.user.id}).populate(['amenities','category']).sort({createdAt:-1})
    return res.json(properties)
})

router.put('/:id',auth,async(req,res,next)=>{
try{


await Property.findOneAndUpdate({_id:req.params.id},req.body,{new:true})





return res.json({message:"Successfuly updated"})

}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})
router.post('/search',async function(req, res, next) {
   var data=req.body
   var search={};

   for(let x in data)
   {
    switch(x)
    {
        case 'cities':
            if(data.cities.length!=0)
            {
                search={...search,city:{$in:data.cities}}
            }

            break;
        case 'areas':
        if(data.areas.length!=0)
            {
                search={...search,area:{$in:data.areas}}
            }
            break;

            case 'categories':
                if(data.categories.length!=0)
                    {
                        search={...search,category:{$in:data.categories}}
                    }
        
                break;
            case 'amenities':
                    if(data.amenities.length!=0)
                        {
                            search={...search,amenities:{$in:data.amenities}}
                        }
                        
            
                    break;

                    case 'type':
                    if(data.type)
                        {
                            search={...search,type:data['type']}
                        }
                        
            
                    break;
                    case 'maxPrice':
                    if(data.maxPrice )
                        {
                            search={...search,price:{ $gt :  data.minPrice, $lt : data.maxPrice}}
                        }
                        
            
                    break;
                    // case 'maxPrice':
                    // if(data.maxPrice)
                    //     {
                    //         search={...search,price:{$lte:data.maxPrice}}
                    //     }
                        
            
                    // break;
        
    }
   }
   


    var limit=req.query.limit??9
    var offset=req.query.offset??0

    try
    {
        properties= await Property.find(search).populate(['category','amenities','area','city']).skip(offset).limit(limit).sort(req.body.sort??{createdAt:-1})
        var total=await Property.find(search).count()
        return   res.json({properties:properties,total:total,search})
    }
    catch(e)
    {
        return res.status(500).json(e.message)
    }
   


});
router.get('/:id',async function(req, res, next) {
        var id=req.params.id
    if(id){
        try
        {
            properties= await Property.findById(id)

            return   res.json(properties)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/details/:id',async function(req, res, next) {
    var id=req.params.id
if(id){
    try
    {
        properties= await Property.findById(id).populate(['category','amenities','area','city','user'])

        return   res.json(properties)
    }
    catch(e)
    {
        return res.status(403).json(e.message)
    }
   
}

});






router.get('/',async function(req, res, next) {

properties=await Property.find().populate(['amenities','category','area'])
return res.json(properties )
});


module.exports = router;