const Sequelize = require("sequelize");
const user=require("../models/user.model")
const sequelize = new Sequelize(
    'crystalclean',
   'mo3teznsr',
    '13347628',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {


    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('../models/user.model')(sequelize, Sequelize);
db.Address = require('../models/address.model')(sequelize, Sequelize);
db.Area = require('../models/area.model')(sequelize, Sequelize);
db.Role = require('../models/role.model')(sequelize, Sequelize);
db.Banner = require('../models/banner.model')(sequelize, Sequelize);
db.Brand = require('../models/brand.model')(sequelize, Sequelize);
db.Model = require('../models/model.model')(sequelize, Sequelize);
db.Order = require('../models/order.model')(sequelize, Sequelize);
db.Content = require('../models/content.model')(sequelize, Sequelize);
db.Faq = require('../models/faq.model')(sequelize, Sequelize);
db.Company = require('../models/company.model')(sequelize, Sequelize);
db.Invoice = require('../models/invoice.model')(sequelize, Sequelize);
db.Gift = require('../models/gift.model')(sequelize, Sequelize);
db.Package = require('../models/package.model')(sequelize, Sequelize);
db.Product = require('../models/product.model')(sequelize, Sequelize);
db.Service = require('../models/service.model')(sequelize, Sequelize);
db.Vehicle = require('../models/vehicle.model')(sequelize, Sequelize);
db.Country = require('../models/country.model')(sequelize, Sequelize);
db.Otp = require('../models/otp.model')(sequelize, Sequelize);
db.Coupon = require('../models/coupon.model')(sequelize, Sequelize);
db.Color = require('../models/color.model')(sequelize, Sequelize);
db.Review = require('../models/review.model')(sequelize, Sequelize);
db.PackageOrder = require('../models/packageOrder.model')(sequelize, Sequelize);
db.orderProduct = require('../models/orderProducts.model')(sequelize, Sequelize);
db.Status = require('../models/status.model')(sequelize, Sequelize);
db.User?.associate(db)
//db.Otp?.associate(db)
db.Role?.associate(db)
db.Coupon?.associate(db)
//db.Packagc§§eOrder?.associate(db)
db.Review?.associate(db)
db.Company?.associate(db)
db.Invcoie?.associate(db)
db.Banner?.associate(db)
db.Brand?.associate(db)
db.Model?.associate(db)
db.Order?.associate(db)
db.Package?.associate(db)
db.Product?.associate(db)
db.Service?.associate(db)
db.Vehicle?.associate(db)
db.Country?.associate(db)
db.orderProduct.associate(db)
db.Status.associate(db);
db.Area.associate(db);
db.Gift?.associate(db)
db.Company?.associate(db)
db.Invoice?.associate(db)
 db.Company.sync()
 db.Invoice.sync()
 //db.Gift.sync({force:true})
 //db.Otp.sync()
// db.Role.sync()
// db.Address.sync()
// db.Banner.sync()
// db.Brand.sync()
//db.sequelize.sync({force:true})
 //db.Order.sync({force: true})
// db.Package.sync()
// db.Product.sync()
// db.Service.sync()
// db.Vehicle.sync()
// db.Model.sync()
module.exports = db;