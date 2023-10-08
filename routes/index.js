var express = require('express');
var router = express.Router();
const auth=require('./auth')
const upload=require('./upload')
const city=require('./city')
const area=require('./area')
const category=require('./category')
const amenity=require('./amenity')
const wishlist=require('./wishlist')
const property=require('./property')
const payment=require('./payment')
const country=require('./country')
const services=require('./service')
const address=require('./address')
const banner=require('./banner')
const package=require('./package')
const Brand=require('./brand')
const Model=require('./model')
const Color=require('./color')
const vehicle=require('./vehicle')
const product=require('./product')
const authMiddleware=require('../middleware/auth');

/* GET home page. */
router.use('/properties',property)
router.use('/product',product)
router.use('/vehicle',vehicle)
router.use('/address',address)
router.use('/auth',auth)
router.use('/areas',area)
router.use('/cities',city)
router.use('/upload',upload)
router.use('/categories',category)
router.use('/payments',payment)
router.use('/amenities',amenity)
router.use('/services',services)
router.use('/banners',banner)
router.use('/packages',package) 
router.use('/wishlist',wishlist)
router.use('/country',country)
router.use('/brands',Brand)
router.use('/models',Model)
router.use('/colors',Color)
router.post('/profile',authMiddleware,function(req,res){
  return res.json(req.user.id);
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
