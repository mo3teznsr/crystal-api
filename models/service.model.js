//const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = DataTypes;
    const Service = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_ar: {
            type: STRING(50),
            allowNull: false,
        },
        is_active:{
            type: DataTypes.INTEGER,
            default:1
        },
        name_en: {
            type: STRING(50),
            allowNull: false,
        },
        image: {
            type: STRING(50),
            allowNull: true,
        },
        description: {
            type: TEXT,
        },
        discount: {
            type: DataTypes.FLOAT,
            default:0
        },
        price: {
            type: DECIMAL(20, 2),
            allowNull: false,
        },
        cashBack:{
            type: DataTypes.INTEGER,
            allowNull: true,
            default:0
        },
        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'created_at'
        },
        updatedAt: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'updated_at'
        },
    }, {
        timestamps: false,
        tableName: 'services',
      
    });

    Service.associate = (models) => {}
 



    return Service;
};