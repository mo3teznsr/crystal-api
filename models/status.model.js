module.exports = function (sequelize, DataTypes) {
    const Status = sequelize.define(
        'Status', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name_en: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            name_ar: {
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
            tableName: 'statuses'
        }
    );

    Status.associate = function (models) {
       // Address.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Status;
};