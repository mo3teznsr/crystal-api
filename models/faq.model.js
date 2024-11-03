//const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = DataTypes;
    const Service = sequelize.define('FAQ', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question: {
            type: STRING(50),
            allowNull: false,
        },
        anwser: {
            type: TEXT,
            allowNull: true,
        },

    }, {
        timestamps: false,
        tableName: 'faqs',
      
    });

    Service.associate = (models) => {}
 



    return Service;
};