const bcrypt = require("bcrypt");
const { faker } = require('@faker-js/faker');

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
        name: 'Rendi Kurniawan',
        password: await bcrypt.hash('gacor', 10),
        roleId: adminRole,
        gambar: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'meutia@admin.fti.unand.ac.id',
        password: await bcrypt.hash('admin123', 10),
        name: 'Meutia Dewi Putri Kartika',
        gambar: faker.image.url(),
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'faiz@admin.fti.unand.ac.id',
        password: await bcrypt.hash('admin123', 10),
        name: 'Muhammad Faiz Al-Dzikro',
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const alumniRole = await queryInterface.rawSelect('role', { where: { id: 2 } }, ['id']);
    await queryInterface.bulkInsert('alumni', [
      {
        id: 21,
        nim: '2211520007',
        email: 'asep@gmail.com',
        name: 'Asep',
        gambar: ('alumni1.webp'),
        password: await bcrypt.hash('alumnifti', 10),
        roleId: alumniRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    const alumni = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      nim: faker.number.int({ min: 2211510000, max: 2211953999 }).toString(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      gambar: faker.image.url(),
      password: bcrypt.hashSync('alumnifti', 10),
      roleId: alumniRole,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
    }));
    await queryInterface.bulkInsert('alumni', alumni, {});
    

    const articles = Array.from({ length: 10 }, () => ({
      judul: faker.lorem.sentence(),
      konten: faker.lorem.paragraphs(),
      gambar: faker.image.url(),
      kategori: faker.helpers.arrayElement(['Karir', 'Pendidikan', 'Teknologi']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      admin_id: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('artikel', articles, {});

    const jobVacancies = Array.from({ length: 15 }, () => ({
      judul: faker.person.jobTitle(),
      deskripsi: faker.lorem.paragraph(),
      tanggal_tutup: faker.date.future(),
      gambar: faker.image.url(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      admin_id: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('lowongan_pekerjaan', jobVacancies, {});

    
    await queryInterface.bulkInsert('provinsi', [
      { id_prov: 1, nama: 'Aceh', latitude: 4.695135, longitude: 97.493993, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 2, nama: 'Sumatera Utara', latitude: 2.1153547, longitude: 99.5451976, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 3, nama: 'Sumatera Barat', latitude: -0.7399397, longitude: 100.852056, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 4, nama: 'Riau', latitude: 0.2933469, longitude: 101.7068294, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 5, nama: 'Kep. Riau', latitude: -1.4851831, longitude: 104.2380581, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 6, nama: 'Jambi', latitude: -1.6100481, longitude: 103.6100395, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 7, nama: 'Sumatera Selatan', latitude: -3.320567, longitude: 104.9147136, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 8, nama: 'Kep. Bangka Belitung', latitude: -2.7410504, longitude: 106.4405872, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 9, nama: 'Bengkulu', latitude: -3.5778471, longitude: 102.3463875, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 10, nama: 'Lampung', latitude: -4.5585842, longitude: 105.4068077, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 11, nama: 'DKI Jakarta', latitude: -6.2087634, longitude: 106.845599, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 12, nama: 'Jawa Barat', latitude: -6.9034442, longitude: 107.6082421, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 13, nama: 'Banten', latitude: -6.1202064, longitude: 106.150876, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 14, nama: 'Jawa Tengah', latitude: -7.150975, longitude: 110.1402596, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 15, nama: 'DI Yogyakarta', latitude: -7.797068, longitude: 110.3705293, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 16, nama: 'Jawa Timur', latitude: -7.5360649, longitude: 112.2384011, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 17, nama: 'Kalimantan Barat', latitude: -0.1467577, longitude: 109.3244125, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 18, nama: 'Kalimantan Tengah', latitude: -1.6814878, longitude: 113.3823545, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 19, nama: 'Kalimantan Selatan', latitude: -3.0926415, longitude: 115.2837585, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 20, nama: 'Kalimantan Timur', latitude: 0.5242476, longitude: 116.6291029, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 21, nama: 'Kalimantan Utara', latitude: 3.1659434, longitude: 116.002973, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 22, nama: 'Sulawesi Utara', latitude: 1.4091793, longitude: 124.8278526, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 23, nama: 'Gorontalo', latitude: 0.6994371, longitude: 122.446723, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 24, nama: 'Sulawesi Tengah', latitude: -1.4308628, longitude: 121.4456179, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 25, nama: 'Sulawesi Selatan', latitude: -4.020494, longitude: 119.8934726, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 26, nama: 'Sulawesi Barat', latitude: -2.4955836, longitude: 119.3488533, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 27, nama: 'Sulawesi Tenggara', latitude: -4.123069, longitude: 122.054226, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 28, nama: 'Bali', latitude: -8.340539, longitude: 115.0919509, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 29, nama: 'Nusa Tenggara Barat', latitude: -8.6505926, longitude: 117.3616476, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 30, nama: 'Nusa Tenggara Timur', latitude: -10.1771803, longitude: 123.6070322, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 31, nama: 'Maluku', latitude: -3.2384616, longitude: 129.4824822, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 32, nama: 'Maluku Utara', latitude: 0.697366, longitude: 127.4380971, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 33, nama: 'Papua Barat', latitude: -0.8614532, longitude: 134.0620425, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 34, nama: 'Papua', latitude: -4.2699288, longitude: 138.0803526, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 35, nama: 'Papua Tengah', latitude: -3.6845064, longitude: 137.0246603, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 36, nama: 'Papua Pegunungan', latitude: -3.8862133, longitude: 138.505103, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 37, nama: 'Papua Selatan', latitude: -6.2099637, longitude: 140.2637993, createdAt: new Date(), updatedAt: new Date() },
      { id_prov: 38, nama: 'Papua Barat Daya', latitude: -1.108663, longitude: 132.2928374, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    const provinsiIds = await queryInterface.sequelize.query(
      "SELECT nama FROM provinsi;"
    );
    const unicornCompanies = [
      "GoTo",
      "Bukalapak",
      "Traveloka",
      "Xendit",
      "J&T Express",
      "OVO",
      "Ajaib",
      "Tiket.com",
      "Blibli",
      "Kredivo",
    ];
    const alumniForm = Array.from({ length: 20 }, (_, index) => ({
      nama: alumni[index].name,
      nim: alumni[index].nim,
      nomorkontak: faker.phone.number(),
      email: alumni[index].email,
      angkatanlulus: faker.helpers.arrayElement([2020, 2019, 2018, 2017]),
      waktu_tunggu: faker.number.int({ min: 0, max: 24 }),
      prodi_s1: faker.helpers.arrayElement(['Sistem Informasi', 'Teknik Komputer', 'Teknik Informatika']),
      prodi_s2: faker.helpers.arrayElement([null, 'Magister Sistem Informasi', 'Magister Teknik Informatika']),
      prodi_s3: null,
      pend_profesi: faker.helpers.arrayElement([null, 'PMP', 'CCNA']),
      provinsi_nama: faker.helpers.arrayElement(provinsiIds[0]).nama,
      tempat_bekerja: faker.helpers.arrayElement(unicornCompanies),
      jabatan: faker.person.jobTitle(),
      alamat_domis: faker.location.streetAddress(),
      hobi: faker.word.sample(),
      masukan_saran: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
    }));
    await queryInterface.bulkInsert('formulir_alumni', alumniForm, {});

    const tracerStudyPeriodscustom = Array.from({ length: 1 }, () => ({
      nama_periode: `Tracer Study Juni`,
      keterangan: faker.lorem.sentence(),
      tanggal_mulai: new Date("2024-06-01T00:00:00.000Z"),
      tanggal_akhir: new Date("2024-06-30T00:00:00.000Z"),
      createdAt: new Date(),
      updatedAt: new Date(),
      admin_id: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('periode_tracer_study', tracerStudyPeriodscustom, {});
    
    const tracerStudyPeriods = Array.from({ length: 3 }, () => ({
      nama_periode: `Tracer Study ${faker.date.month()} ${faker.date.future().getFullYear()}`,
      keterangan: faker.lorem.sentence(),
      tanggal_mulai: faker.date.future(),
      tanggal_akhir: faker.date.future(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      admin_id: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('periode_tracer_study', tracerStudyPeriods, {});

    
    const detailForms = alumniForm.map((form, index) => ({
      alumni_id: index + 1,
      formulir_id: index + 1,
      periode_tracer_studyId: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('detail_formulir', detailForms, {});

    
    const eventProposals = Array.from({ length: 10 }, () => ({
      judul: faker.lorem.words(3),
      deskripsi: faker.lorem.paragraph(),
      tanggal_event: faker.date.future(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));
    await queryInterface.bulkInsert('form_pengajuan_event', eventProposals, {});

    const eventProposalStatussiAsep = Array.from({ length: 5 }, (_, index) => ({
      deskripsi: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['Menunggu persetujuan', 'Pengajuan Diterima', 'Pengajuan Ditolak']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      alumni_id: 21,
      pengajuan_event_id: index + 1
    }));
    await queryInterface.bulkInsert('pengajuan_event', eventProposalStatussiAsep, {});

    
    const reports = Array.from({ length: 5 }, () => ({
      judul: `Laporan ${faker.word.sample()} ${faker.date.past().getFullYear()}`,
      konten: faker.lorem.paragraphs(),
      jenis_laporan: faker.helpers.arrayElement(['Tracer Study', 'Kegiatan Alumni', 'Laporan Tahunan']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      admin_id: faker.number.int({ min: 1, max: 3 })
    }));
    await queryInterface.bulkInsert('laporan', reports, {});
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
    await queryInterface.bulkDelete('provinsi', null, {});
  }
};
