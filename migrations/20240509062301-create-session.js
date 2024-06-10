'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: Sequelize.STRING,
        expires: Sequelize.DATE,
        data: Sequelize.TEXT,
    });
},
async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessions');
}
};