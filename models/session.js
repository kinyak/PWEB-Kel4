// Inside your models folder (usually models/session.js)
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Session = sequelize.define('sessions', {  // Note: lowercase 'session' is conventional
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming sessions always belong to a user
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data: DataTypes.TEXT, // Store session data here
    });
    return Session;
};