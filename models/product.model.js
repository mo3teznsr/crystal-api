

module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = DataTypes;
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_ar: {
            type: STRING,
            allowNull: false,
        },
        name_en: {
            type: STRING,
            allowNull: false,
        },
        image: {
            type: STRING,
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
            type: DECIMAL,
            allowNull: false,
        },
        
       
        isActive: {
            type: INTEGER(11),
            allowNull: false,
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
    });

    Product.beforeBulkUpdate(product => {
        product.attributes.updateTime = new Date();
        return product;
    });
    Product.associate = (models) => {}

    return Product;
};