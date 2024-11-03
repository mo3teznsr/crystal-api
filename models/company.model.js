module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'companies', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobile:{
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
            tableName: 'companies'
        }
    );

    Model.associate = function (models) {
       // Address.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Model;
};