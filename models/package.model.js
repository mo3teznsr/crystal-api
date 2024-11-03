module.exports = function (sequelize, DataTypes) {
    const Package = sequelize.define(
        'Package', {
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
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
name_en: {
                type: DataTypes.STRING,
                allowNull: false,
            },
name_ar: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tag: {
                type: DataTypes.STRING,
                allowNull: true,
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
            is_active:{
                type:DataTypes.INTEGER,
                allowNull:true,
                default:1
            }
        }
    );

    Package.associate = function (models) {
        Package.addScope('defaultScope', {
            include: ['service']
        },
        {// defaultScope already exists, to avoid the error pass override
            override: true,
        });
        Package.belongsTo(models.Service, {onDelete: 'cascade', foreignKey: 'serviceId',as:"service"});
       // Package.hasMany(models.Product);
     
    };
    return Package;
};