var express = require('express');
var router = express.Router();
const Address=require('../config/server').Coupon

const Sequelize= require('../config/server').sequelize
const auth=require('../middleware/auth');
const moment = require('moment');


router.post('/',auth,async function(req, res, next){
try{
    
        if(req.body.id)
    {
        const item=await Address.findByPk(req.body.id)
        for(let x in req.body)
        {
            item[x]=req.body[x]
        }
        item.save()
        return res.json(item)
    }
const order= await Address.create({...req.body} );

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

await Address.findOneAndUpdate({id:req.params.id,user_id:req.user.id},req.body,{new:true})

return res.json({message:"Successfuly updated"})

}
catch(e)
{
    console.log(e)
    return res.status(500).json(e.message)

}
})
router.get('/:id',auth,async function(req, res, next) {
        var id=req.params.id
        const toDay=moment().format('YYYY-MM-DD')
        const discounts=await Sequelize.query(`SELECT * FROM coupons WHERE start_at <= '${toDay}' and end_at >= '${toDay}' and user_limit > (select count(id) from orders where orders.user_id='${req.user.id}' and coupon_id=coupons.id) and total_limit > (select count(id) from orders where coupon_id=coupons.id) and is_active=1 and code='${id}'`,{ type: Sequelize.QueryTypes.SELECT,})
        return res.json(discounts[0])
   
});


router.get('/',auth,async function(req, res, next) {
amenities=await Address.findAll({where:{},order:[['id', 'DESC']]
//,include:['vehicle','address']
})
return res.json(amenities )
});


module.exports = router;