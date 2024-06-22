'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('periode_tracer_study', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_periode: {
        type: Sequelize.STRING(255)
      },
      keterangan: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tanggal_mulai: {
        type: Sequelize.DATE
      },
      tanggal_akhir: {
        type: Sequelize.DATE
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',
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
    await queryInterface.dropTable('periode_tracer_study');
  }
};