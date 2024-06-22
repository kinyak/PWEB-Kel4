const db = require('../../models');
const { Sequelize } = require('../../models');
const { Op } = Sequelize;
const PeriodeTracerStudy = db.periode_tracer_study;
const Admin = db.admin;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/images/artikel/'); 
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
    }
    });
    
    const upload = multer({ storage: storage });


const getAllPeriodeTracerStudy = async (req, res) => {
    try {
        const oldData = req.flash('oldData')[0] || {}; 
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const { count, rows } = await PeriodeTracerStudy.findAndCountAll({
            offset,
            limit,
            include: { model: Admin, attributes: ['email'] },
        });
        const totalPages = Math.ceil(count / limit);
        const admins = await Admin.findAll()
    
        const formattedRows = rows.map(row => ({
            ...row.toJSON(),
            tanggal_mulai: new Date(row.tanggal_mulai).toLocaleDateString(),
            tanggal_akhir: new Date(row.tanggal_akhir).toLocaleDateString(),
        }));
        adminEmail = req.session.user.email;
        const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
        res.render('admin/form/periodetracerstudy', {
            tracerstudy: formattedRows,
            currentPage: parseInt(page),
            totalRecords: count,
            totalPages,
            recordsPerPage: limit,
            admins,
            oldData,
            admin: adminInstance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan server');
    }
};


const tambahPeriodeTracerStudy = async (req, res) => {
try {
    const { nama_periode, keterangan, tanggal_mulai, tanggal_akhir, admin_id } = req.body;
    const inputan = await PeriodeTracerStudy.create({ nama_periode, keterangan, tanggal_mulai, tanggal_akhir, admin_id });
    const tracerstudy = await PeriodeTracerStudy.findAll()

    const title = inputan.nama_periode;
    const tracerstudyInstance = await PeriodeTracerStudy.findOne({ where: { nama_periode: title } });
    if (req.file) {
        const filePath = `/${req.file.path.replace(/public\\/g, '').replace(/\\/g, '/')}`;
        tracerstudyInstance.gambar = filePath;
        await adminInstance.save();
    }
    res.redirect('/admin/tracerstudy');
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const ubahPeriodeTracerStudy = async (req, res) => {
try {
    const { judul, konten, gambar, kategori, admin_id } = req.body;
    const artikel = await Artikel.findByPk(req.params.id);
    artikel.judul = judul;
    artikel.konten = konten;
    artikel.gambar = gambar;
    artikel.kategori = kategori;
    artikel.admin_id = admin_id;
    await artikel.save();
    res.redirect('/admin/artikel');
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

const hapusPeriodeTracerStudy = async (req, res) => {
    try {
    const { alumniIds } = req.body;
    console.log(alumniIds)
    if (!alumniIds || !Array.isArray(alumniIds) || alumniIds.length === 0) {
        return res.status(400).json({ error: 'No artikel IDs provided' });
    }

    const deletedTracerStudy = await PeriodeTracerStudy.destroy({
        where: {
        id: alumniIds,
        },
    });

    res.status(200).json({ message: `${deletedTracerStudy} periode deleted successfully` });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
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
    getAllPeriodeTracerStudy,
    tambahPeriodeTracerStudy,
    ubahPeriodeTracerStudy,
    hapusPeriodeTracerStudy,
    uploadPhoto
};
