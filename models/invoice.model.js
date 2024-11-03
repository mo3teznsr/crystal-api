
module.exports = function (sequelize, DataTypes) {
    const {INTEGER,FLOAT,TIME, DATE, BIGINT, DECIMAL, UUID, STRING, UUIDV4} = DataTypes;

    const Model = sequelize.define('invoices', {

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
        vehicle_id: {
            type: INTEGER,
            allowNull: true,
            default:0,
        },
	    company_id: {
            type: INTEGER,
             allowNull: true,
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
        address_id: {
            type: INTEGER,
            allowNull: true,
        },
        service_id:{
            type:INTEGER,
            allowNull:true
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
        tableName: 'invoices',
        indexes: [
            {fields: ['user_id']},
        ],
    });

    Model.associate = (models) => {
        Model.addScope('defaultScope', {
            include: ["user",'vehicle','status','coupon','service','company']
        },
        {// defaultScope already exists, to avoid the error pass override
            override: true,
        });
        Model.belongsTo(models.User, {foreignKey: 'user_id',as:"user"});
     //   Model.belongsTo(models.User, {foreignKey: 'provider_id',as:"user",as:"provider"});
        Model.belongsTo(models.Address, {foreignKey: 'address_id',as:"address"});
        Model.belongsTo(models.Vehicle, {foreignKey: 'vehicle_id',as: 'vehicle'});
        Model.belongsTo(models.Status,{foreignKey:'status_id',as: 'status'})
        Model.belongsTo(models.Coupon,{foreignKey:'coupon_id',as: 'coupon'})
        //Model.hasMany(models.orderProduct,{as:'orderProducts',foreignKey: 'order_id'});
        Model.belongsTo(models.Company,{foreignKey:'company_id',as:'company'});
        Model.belongsTo(models.Service,{foreignKey:'service_id',as: 'service'});
    //  Model.belongsToMany(models.Product, {
    //         through: models.orderProduct,
    //         foreignKey: 'order_id',
    //         otherKey: 'product_id',as:"products"
    //     });
    };

   

    return Model;
};