module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'color', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // title: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
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
       // Model.belongsTo(models.Model, {onDelete: 'cascade', foreignKey: 'make_id'});
    };
 
    return  Model;
};