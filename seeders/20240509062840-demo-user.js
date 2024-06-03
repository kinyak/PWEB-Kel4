const bcrypt = require("bcrypt");
("use strict");

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      { id: 1, role: 'admin' },
      { id: 2, role: 'alumni' },
    ], {});
  
    const adminRole = await queryInterface.rawSelect('role', { where: { id: 1 } }, ['id']);
    await queryInterface.bulkInsert('admin', [
      {
        id: 1,
        email: 'rendi@admin.fti.unand.ac.id',
        password: await bcrypt.hash('gacor', 10),
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'meutia@admin.fti.unand.ac.id',
        password: await bcrypt.hash('admin123', 10),
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'faiz@admin.fti.unand.ac.id',
        password: await bcrypt.hash('admin321', 10),
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    const alumniRole = await queryInterface.rawSelect('role', { where: { id: 2 } }, ['id']);
    await queryInterface.bulkInsert('alumni', [
      {
        id: 1,
        nim: '2211520000',
        email: 'asep@gmail.com',
        name: 'Asep',
        password: await bcrypt.hash('gacor', 10),
        roleId: alumniRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    const adminId = await queryInterface.rawSelect('admin', { where: { email: 'rendi@admin.fti.unand.ac.id' } }, ['id']);
    const alumniId = await queryInterface.rawSelect('alumni', { where: { email: 'asep@gmail.com' } }, ['id']);
    await queryInterface.bulkInsert('artikel', [
      {
        judul: 'Peluang Karir di Bidang IT',
        konten: 'Artikel tentang peluang karir di bidang IT...',
        gambar: 'it-career.jpg',
        kategori: 'Karir',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin_id: adminId
      }
    ], {});

    await queryInterface.bulkInsert('lowongan_pekerjaan', [
      {
        judul: 'Software Engineer di Google',
        deskripsi: 'Google mencari Software Engineer...',
        tanggal_tutup: new Date('2024-07-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        admin_id: adminId
      }
    ], {});

    await queryInterface.bulkInsert('formulir_alumni', [
      {
        nama: 'Asep',
        nomorkontak: '083451345454',
        email: 'asep@gmail.com',
        angkatanlulus: new Date('2023-06-01'),
        prodi_s1: 'Sistem Informasi',
        prodi_s2: null,
        prodi_s3: null,
        pend_profesi: null,
        fakultas: 'FTI',
        tempat_bekerja: null,
        jabatan: null,
        alamat_domis: 'Padang',
        hobi: 'Coding',
        masukan_saran: 'Tingkatkan kualitas pengajaran',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('periode_tracer_study', [
      {
        nama_periode: 'Tracer Study 2024',
        keterangan: null,
        tanggal_mulai: new Date('2024-01-01'),
        tanggal_akhir: new Date('2024-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
        admin_id: adminId
      }
    ], {});

    const formulirId = await queryInterface.rawSelect('formulir_alumni', { where: { email: 'asep@gmail.com' } }, ['id']);
    const periodeId = await queryInterface.rawSelect('periode_tracer_study', { where: { nama_periode: 'Tracer Study 2024' } }, ['id']);

    await queryInterface.bulkInsert('detail_formulir', [
      {
        alumni_id: alumniId,
        formulir_id: formulirId,
        periode_tracer_study: periodeId
      }
    ], {});

    await queryInterface.bulkInsert('pengajuan_event', [
      {
        deskripsi: 'Sedang menunggu persetujuan',
        tanggal_tutup: '03-05-2024',
        status: 'Menunggu',
        createdAt: new Date(),
        updatedAt: new Date(),
        alumni_id: alumniId
      }
    ], {});

    const pengajuanId = await queryInterface.rawSelect('pengajuan_event', { where: { alumni_id: 1 } }, ['id']);

    await queryInterface.bulkInsert('form_pengajuan_event', [
      {
        judul: 'Reuni Angkatan 2019',
        deskripsi: 'Acara reuni tahunan angkatan 2019',
        tanggal_event: new Date('2024-08-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        pengajuan_event_id: pengajuanId
      }
    ], {});

    await queryInterface.bulkInsert('laporan', [
      {
        judul: 'Laporan Tracer Study 2023',
        konten: 'Hasil tracer study alumni tahun 2023...',
        jenis_laporan: 'Tracer Study',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin_id: adminId
      }
    ], {});
  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detail_formulir', null, {});
  await queryInterface.bulkDelete('form_pengajuan_event', null, {});
  await queryInterface.bulkDelete('pengajuan_event', null, {});
  await queryInterface.bulkDelete('laporan', null, {});
  await queryInterface.bulkDelete('formulir_alumni', null, {});
  await queryInterface.bulkDelete('periode_tracer_study', null, {});
  await queryInterface.bulkDelete('lowongan_pekerjaan', null, {});
  await queryInterface.bulkDelete('artikel', null, {});
  await queryInterface.bulkDelete('alumni', null, {});
  await queryInterface.bulkDelete('admin', null, {});
  await queryInterface.bulkDelete('role', null, {});
    
  }
};