module.exports = function (sequelize, DataTypes) {
    const Vehicle = sequelize.define(
        'vehicles', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            modelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            colorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            plateText: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            plateNumber: {
                type: DataTypes.STRING(20),
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
        }, {
            tableName: 'vehicles'
        }
    );

    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
        Vehicle.belongsTo(models.Brand, {onDelete: 'cascade', foreignKey: 'brandId'});
        Vehicle.belongsTo(models.Model, {onDelete: 'cascade', foreignKey: 'modelId'});
    };
    return Vehicle;
};