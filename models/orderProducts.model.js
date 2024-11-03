module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'orderProdcuts', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // title: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
            // images: {
            //     type: DataTypes.STRING(50),
            //     allowNull: true,
            // },
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
        },
        {
            timestamps: false,
            tableName: 'orderProdcuts',
            
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.Order, {onDelete: 'cascade', foreignKey: 'order_id'});
        Model.belongsTo(models.Product, {onDelete: 'cascade', foreignKey: 'product_id'});
       // Model.belongsTo(models.Model, {onDelete: 'cascade', foreignKey: 'make_id'});
    };
 
    return  Model;
};