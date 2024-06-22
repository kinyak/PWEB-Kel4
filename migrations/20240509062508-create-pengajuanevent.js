'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengajuan_event', {
      alumni_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'alumni',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        },
      pengajuan_event_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'form_pengajuan_event',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING(255)
      },
      deskripsi: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('pengajuan_event');
  }
};