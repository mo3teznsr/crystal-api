module.exports = function (sequelize, DataTypes) {
    const Country = sequelize.define(
        'Country', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name_ar: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            name_en: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            flag: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            dail_code: {
                type: DataTypes.STRING(50),
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
    Country.associate = (models) => {}
 
    return Country;
};