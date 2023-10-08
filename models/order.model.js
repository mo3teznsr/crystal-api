
module.exports = function (sequelize, DataTypes) {
    const {INTEGER, DATE, BIGINT, DECIMAL, UUID, STRING, UUIDV4} = DataTypes;

    const Order = sequelize.define('orders', {

        id: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: INTEGER,
            allowNull: true,
            field: 'userId',
        },
        serciveId: {
            type: INTEGER,
            allowNull: true,
        },
        vehicleId: {
            type: INTEGER,
            allowNull: true,
        },
        addressId: {
            type: INTEGER,
            allowNull: true,
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
        tableName: 'orders',
        indexes: [
            {fields: ['userId']},
        ],
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {foreignKey: 'userId'});
        Order.belongsTo(models.Address, {foreignKey: 'addressId'});
    };

    Order.beforeBulkUpdate(order => {
        order.attributes.updateTime = new Date();
        return order;
    });

    return Order;
};