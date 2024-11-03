module.exports = function (sequelize, DataTypes) {
    const Address = sequelize.define(
        'Address', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            area_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            lat: {
                type: DataTypes.DECIMAL(20,2),
                allowNull: false,
            },
            lng: {
                type: DataTypes.DECIMAL(20,20),
                allowNull: false,
            },

            address: {
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
            tableName: 'addresses'
        }
    );

    Address.associate = function (models) {
        Address.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
        Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Address;
};