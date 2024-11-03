var express = require('express');
var router = express.Router();
const Address=require('../config/server').Order
const User=require('../config/server').User
const Service=require('../config/server').Service
const orderProduct=require('../config/server').orderProduct
const Sequelize= require('../config/server').sequelize
const auth=require('../middleware/auth');
const moment = require('moment');


router.post('/',auth,async function(req, res, next){
try{
const order= await Address.create({...req.body,user_id:req.user.id,status_id:1} );
for(let i=0;i< req.body.products.length;i++){
    orderProduct.create({order_id:order.id,product_id:req.body.products[i]})
}
if(req.body.method_id==1)
{
const service=await Service.findByPk(req.body.service_id)
const user=await User.findByPk(req.user.id)
user.balance=user.balance*1+service.cashBack*1
await user.save()
}
else if(req.body.method_id==2)
{
  
    const user=await User.findByPk(req.user.id)
    user.balance=user.balance*1-req.body.total*1
    await user.save()
}

return res.json({message:"Successfuly created"})
}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})
router.post('/exclude',async function(req, res, next){

    const toDay=moment().format('YYYY-MM-DD')
    const exclude=await Sequelize.query(`SELECT date(bookingDate) as date,bookingTime FROM orders WHERE date(bookingDate) >= '${toDay}'`,{ type: Sequelize.QueryTypes.SELECT,})
    return res.json(exclude)

})
router.put('/:id',auth,async(req,res,next)=>{
try{
 var id=req.params.id
const item=await Address.findByPk(id)

    for(let x in req.body)
    {
        item[x]=req.body[x]
    }
    item.save()
    return res.json(item)


return res.json({message:"Successfuly updated"})

}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})

router.get('/details/:id',auth,async function(req, res, next) {
    var id=req.params.id
if(id){
    try
    {
        amenities= await Address.findOne({id,user_id:req.user.id})

        return   res.json(amenities)
    }
    catch(e)
    {
        return res.status(403).json(e.message)
    }
   
}

});
router.get('/list',auth,async function(req, res, next) {
    const amenities=await Address.findAll({where:{},order:[['id', 'DESC']]
   //,include:['vehicle','address']
   })
   
   
   
   return res.json(amenities )
   });
router.get('/:id',auth,async function(req, res, next) {
        var id=req.params.id
    if(id){
        try
        {
            amenities= await Address.findByPk(id)

            return   res.json(amenities)
        }
        catch(e)
        {
            return res.status(403).json(e.message)
        }
       
    }
   
});


router.get('/',auth,async function(req, res, next) {
const user=await User.findOne({id:req.user.id});
if(user.role_id==1)
{
const orders=await Address.findAll({where:{provider_id:req.user.id},order:[['bookingDate', 'DESC']]
//,include:['vehicle','address']
})
return res.json(orders)
}
 const amenities=await Address.findAll({where:{user_id:req.user.id},order:[['bookingDate', 'DESC']]
//,include:['vehicle','address']
})

 

return res.json(amenities )
});




module.exports = router;