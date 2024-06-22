const db = require('../../models');
const Lowongan = db.lowongan_pekerjaan;
const Admin = db.admin;
const alumni = db.alumni;
const fs = require('fs');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/images/lowongan/'); 
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    }
    });
    
    const upload = multer({ storage: storage });


const getAllLowongan = async (req, res) => {
try {
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    const lowongan = await Lowongan.findAll({
    include: { model: Admin, attributes: ['email'] } 
    });
    res.render('admin/lowongan/daftarLowongan', { lowongan, admin: adminInstance });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const getAllLowonganAlumni = async (req, res) => {
    try {
        alumniEmail = req.session.user.email;
    const alumniInstance = await alumni.findOne({ where: { email: alumniEmail } });
        const lowongan = await Lowongan.findAll({
        include: { model: Admin, attributes: ['email'] }
        });
        res.render('alumni/lowongan/daftarLowongan', { lowongan, alumni: alumniInstance });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan server');
    }
    };


const renderTambahLowongan = async (req, res) => {
try {alumniEmail = req.session.user.email;
    const alumniInstance = await alumni.findOne({ where: { email: alumniEmail } });
    const oldData = req.flash('oldData')[0] || {};
    console.log(oldData)
    const admin = await Admin.findAll();
    res.render('admin/lowongan/tambahLowongan', { admin, oldData, alumni:alumniInstance });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const tambahLowongan = async (req, res) => {
try {
    
    const {judul, deskripsi, tanggalTutup, admin_id, } = req.body;
    const tanggal = tanggalTutup
    const inputan = await Lowongan.create({ judul, deskripsi, tanggal_tutup: tanggal, admin_id });
    const lowongan = await Lowongan.findAll()

    const title = inputan.judul;
    const lowonganInstance = await Lowongan.findOne({ where: { judul: title } });
    if (req.file) {
        const filePath = `/${req.file.path.replace(/public\\/g, '').replace(/\\/g, '/')}`;
        lowonganInstance.gambar = filePath;
        await lowonganInstance.save();
    }
    res.redirect('/admin/lowongan')
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

const renderUbahLowongan = async (req, res) => {
try {
    alumniEmail = req.session.user.email;
    const alumniInstance = await alumni.findOne({ where: { email: alumniEmail } });
    const lowongan = await Lowongan.findByPk(req.params.id, {
    include: { model: Admin, attributes: ['email'] } 
    });
    const admin = await Admin.findAll();
    res.render('admin/lowongan/ubahLowongan', { lowongan, admin, alumni: alumniInstance });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const ubahLowongan = async (req, res) => {
try {
    const { judul, deskripsi, tanggalTutup, admin_id } = req.body;
    const lowongan = await Lowongan.findByPk(req.params.id);
    lowongan.judul = judul;
    lowongan.deskripsi = deskripsi;
    lowongan.tanggalTutup = tanggalTutup;
    lowongan.admin_id = admin_id;
    await lowongan.save();
    res.redirect('/admin/lowongan');
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const hapusLowongan = async (req, res) => {
    try {
        const lowonganId = req.params.id;
        const lowongan = await Lowongan.findByPk(lowonganId);
    
        if (!lowongan) {
        return res.status(404).json({ message: 'Lowongan tidak ditemukan' });
        }
    
        await lowongan.destroy();
        res.status(200).json({ message: 'Lowongan berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting lowongan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};



const uploadPhoto = (req, res, next) => {
    upload.single('gambar')(req, res, (err) => {
    if (err) {

        return res.status(400).json({ error: err.message });
    }

    next()
    });
};

module.exports = {
getAllLowongan,
renderTambahLowongan,
tambahLowongan,
renderUbahLowongan,
ubahLowongan,
hapusLowongan,
getAllLowonganAlumni,
uploadPhoto
};