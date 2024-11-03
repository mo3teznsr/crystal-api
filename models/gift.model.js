module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'Gift', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mobile: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

	    code: {
                type: DataTypes.INTEGER,
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
            tableName: 'gifts'
        }
    );

    Model.associate = function (models) {
        Model.belongsTo(models.User, {onDelete: 'cascade', foreignKey: 'userId'});
      //  Address.belongsTo(models.Area, {onDelete: 'cascade', foreignKey: 'areaId'});
    };
    return Model;
};