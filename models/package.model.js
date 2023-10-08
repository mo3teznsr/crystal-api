module.exports = function (sequelize, DataTypes) {
    const Package = sequelize.define(
        'Package', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            sericeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Months: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tag: {
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
        }
    );

    Package.associate = function (models) {
        Package.belongsTo(models.Service, {onDelete: 'cascade', foreignKey: 'serviceId'});
        Package.hasMany(models.Product);
     
    };
    return Package;
};