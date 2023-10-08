const Sequelize = require("sequelize");
const user=require("../models/user.model")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
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
db.Role = require('../models/role.model')(sequelize, Sequelize);
db.Banner = require('../models/banner.model')(sequelize, Sequelize);
db.Brand = require('../models/brand.model')(sequelize, Sequelize);
db.Model = require('../models/model.model')(sequelize, Sequelize);
db.Order = require('../models/order.model')(sequelize, Sequelize);
db.Package = require('../models/package.model')(sequelize, Sequelize);
db.Product = require('../models/product.model')(sequelize, Sequelize);
db.Service = require('../models/service.model')(sequelize, Sequelize);
db.Vehicle = require('../models/vehicle.model')(sequelize, Sequelize);
db.Country = require('../models/country.model')(sequelize, Sequelize);
db.Color = require('../models/color.model')(sequelize, Sequelize);

db.User?.associate(db)
db.Role?.associate(db)
db.Banner?.associate(db)
db.Brand?.associate(db)
db.Model?.associate(db)
db.Order?.associate(db)
db.Package?.associate(db)
db.Product?.associate(db)
db.Service?.associate(db)
db.Vehicle?.associate(db)
db.Country?.associate(db)


 //db.Country.sync()
 db.User.sync()
// db.Role.sync()
// db.Address.sync()
// db.Banner.sync()
// db.Brand.sync()

// db.Order.sync()
// db.Package.sync()
// db.Product.sync()
// db.Service.sync()
// db.Vehicle.sync()
// db.Model.sync()
module.exports = db;