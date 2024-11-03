module.exports = function (sequelize, DataTypes) {
    const Area = sequelize.define(
        'reviews', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            review: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comment: {
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
        }, {
            tableName: 'reviews'
        }
    );
 
    Area.associate = function (models) {
        Area.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'user_id',as:"user"});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Area;
};