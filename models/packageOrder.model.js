module.exports = function (sequelize, DataTypes) {
    const Package = sequelize.define(
        'PackageOrder', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Months: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            service_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Months:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            paymentIntent:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            end_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            package_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                field: 'updated_at'
            },
        }
        ,{
            tableName: 'package_orders',
        }
    );

    Package.associate = function (models) {
        Package.addScope('defaultScope', {
            include: ['orders','package']
        },
        {// defaultScope already exists, to avoid the error pass override
            override: true,
        });
        Package.belongsTo(models.Package, {onDelete: 'cascade', foreignKey: 'package_id',as:"package"});
        Package.belongsTo(models.Service, {onDelete: 'cascade', foreignKey: 'service_id',as:"service"});
        Package.hasMany(models.Order,{as:'orders',foreignKey: 'package_order_id'});
       // Package.hasMany(models.Product);
     
    };
    return Package;
};