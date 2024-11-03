module.exports = function (sequelize, DataTypes) {
    const Coupon = sequelize.define(
        'coupons', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_active: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default:1
            },
            user_limit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default:1
            },
            total_limit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default:100
            },
            start_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                field: 'created_at'
            },
            end_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                field: 'created_at'
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
            tableName: 'coupons'
        }
    );

    Coupon.associate = function (models) {
       // Address.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Coupon;
};