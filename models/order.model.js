
module.exports = function (sequelize, DataTypes) {
    const {INTEGER,FLOAT,TIME, DATE, BIGINT, DECIMAL, UUID, STRING, UUIDV4} = DataTypes;

    const Order = sequelize.define('orders', {

        id: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: INTEGER,
            allowNull: true,
            
        },
	provider_id: {
            type: INTEGER,
             allowNull: true,
           
        },
        paymentIntent:{
            type:STRING,
            allowNull:true
        },
        bookingTime:{
            type:TIME
        },
        coupon_id:{
            type:INTEGER,
            allowNull:true
        },
        status_id:{
            type:INTEGER,
            allowNull:true,
            default:2
        },
        bookingDate:{
            type:DATE
        },
        service_id: {
            type: INTEGER,
            allowNull: false,
        },
        vehicle_id: {
            type: INTEGER,
            allowNull: true,
        },
        address_id: {
            type: INTEGER,
            allowNull: true,
        },
        coupon_id: {
            type: INTEGER,
            allowNull: true,
        },
        subTotal: {
            type: FLOAT,
            allowNull: true,
        },
        total: {
            type: FLOAT,
            allowNull: true,
        },
        discount: {
            type: FLOAT,
            allowNull: true,
        },
        package_order_id:{
            type: INTEGER,
            allowNull: true,
        },
        method_id:{
            type: INTEGER,
            allowNull: true,
            default:1  
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
            {fields: ['user_id']},
        ],
    });

    Order.associate = (models) => {
        Order.addScope('defaultScope', {
            include: ["user",'address','vehicle','status','coupon','products','service','provider']
        },
        {// defaultScope already exists, to avoid the error pass override
            override: true,
        });
        Order.belongsTo(models.User, {foreignKey: 'user_id',as:"user"});
	    Order.belongsTo(models.User, {foreignKey: 'provider_id',as:"user",as:"provider"});
        Order.belongsTo(models.Address, {foreignKey: 'address_id',as:"address"});
        Order.belongsTo(models.Vehicle, {foreignKey: 'vehicle_id',as: 'vehicle'});
        Order.belongsTo(models.Status,{foreignKey:'status_id',as: 'status'})
        Order.belongsTo(models.Coupon,{foreignKey:'coupon_id',as: 'coupon'})
        Order.hasMany(models.orderProduct,{as:'orderProducts',foreignKey: 'order_id'});
     //   Order.belongsTo(models.Address,{foreignKey:'address_id'});
        Order.belongsTo(models.Service,{foreignKey:'service_id',as: 'service'});
        Order.belongsToMany(models.Product, {
            through: models.orderProduct,
            foreignKey: 'order_id',
            otherKey: 'product_id',as:"products"
        });
    };

    Order.beforeBulkUpdate(order => {
        order.attributes.updateTime = new Date();
        return order;
    });

    return Order;
};