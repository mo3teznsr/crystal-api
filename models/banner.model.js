module.exports = function (sequelize, DataTypes) {
    const Banner = sequelize.define(
        'Banner', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            image:{
                type:DataTypes.STRING,
                allowNull:false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
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
        }
    );

    Banner.associate = (models) => {}
    return Banner;
};