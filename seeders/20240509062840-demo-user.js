const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "admins",
      [
        {
          email: "rendi@admin.fti.unand.ac.id",
          password: await bcrypt.hash("gacor", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "meutia@admin.fti.unand.ac.id",
          password: await bcrypt.hash("admin123", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "faiz@admin.fti.unand.ac.id",
          password: await bcrypt.hash("admin321", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "alumni",
      [
        {
          nim: "2211520000",
          name: "Asep",
          password: await bcrypt.hash("gacor", 10),
          date_of_birth: new Date("2002-02-18"),
          phone: "083451345454",
          gender: "Laki-laki",
          address: "Padang",
          email: "asep@gmail.com",
          departemen: "Sistem Informasi",
          pekerjaan: "Belum Bekerja",
          perusahaan: null,
          jabatan: null,
          role: "alumni",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
    await queryInterface.bulkDelete('alumni', null, {});
  },
};