module.exports = function (sequelize, DataTypes) {
    const Package = sequelize.define(
        'reset_attempts', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code: {
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
            isActive:{
                type:DataTypes.INTEGER,
                allowNull:true,
                default:1
            }
        }
    );

    Package.associate = function (models) {}
    //    Package.addScope('defaultScope', {
     //       include: ['service']
      //  },
      
    return Package;
};