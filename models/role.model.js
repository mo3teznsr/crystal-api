module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define(
        'Role', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name_ar:{
                type:DataTypes.STRING,
                allowNull:false
            },
            name_en: {
                type: DataTypes.STRING,
                allowNull: false
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
    Role.associate = (models) => {}
  
    return Role;
};