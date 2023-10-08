module.exports = function (sequelize, DataTypes) {
    const Brand = sequelize.define(
        'brand', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // images: {
            //     type: DataTypes.STRING(50),
            //     allowNull: false,
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
        },{
            tableName: 'Brands'
        }
    );
    Brand.associate = (models) => {}
 
    return Brand;
};