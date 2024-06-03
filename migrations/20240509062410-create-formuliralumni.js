'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formulir_alumni', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(255)
      },
      nim: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      nomorkontak: {
        type: Sequelize.STRING(256)
      },
      angkatanlulus: {
        type: Sequelize.DATE
      },
      prodi_s1: {
        type: Sequelize.STRING(255)
      },
      prodi_s2: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      prodi_s3: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      pend_profesi: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      fakultas: {
        type: Sequelize.STRING(255)
      },
      tempat_bekerja: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      jabatan: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alamat_domis: {
        type: Sequelize.STRING(255)
      },
      hobi: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      masukan_saran: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('formulir_alumni');
  }
};