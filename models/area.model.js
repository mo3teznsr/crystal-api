module.exports = function (sequelize, DataTypes) {
    const Area = sequelize.define(
        'areas', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },


            name_ar: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name_en: {
                type: DataTypes.STRING,
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
            tableName: 'areas'
        }
    );

    Area.associate = function (models) {
       // Address.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Area;
};