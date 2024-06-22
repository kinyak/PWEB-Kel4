'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        expires: Sequelize.DATE,
        data: Sequelize.TEXT,
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
    }
    });
},
async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessions');
}
};