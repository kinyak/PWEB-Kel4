'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artikel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING(255)
      },
      konten: {
        type: Sequelize.TEXT
      },
      gambar: {
        type: Sequelize.STRING(255)
      },
      kategori: {
        type: Sequelize.STRING(255)
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',  // assuming your Admin model's table name is 'admins'
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
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
    await queryInterface.dropTable('artikel');
  }
};