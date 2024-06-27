const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Session = sequelize.define('sessions', {  
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data: DataTypes.TEXT, 
    });
    return Session;
};