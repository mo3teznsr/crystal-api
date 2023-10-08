module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'model', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            make_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // images: {
            //     type: DataTypes.STRING(50),
            //     allowNull: true,
            // },
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
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.Model, {onDelete: 'cascade', foreignKey: 'make_id'});
    };
 
    return  Model;
};