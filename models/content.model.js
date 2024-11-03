//const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = DataTypes;
    const Service = sequelize.define('Content', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: STRING(50),
            allowNull: false,
        },
        content: {
            type: TEXT,
            allowNull: true,
        },

    }, {
        timestamps: false,
        tableName: 'contents',
      
    });

    Service.associate = (models) => {}
 



    return Service;
};