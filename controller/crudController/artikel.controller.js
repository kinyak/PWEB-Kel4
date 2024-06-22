const db = require('../../models');
const { Sequelize } = require('../../models');
const { Op } = Sequelize;
const Artikel = db.artikel;
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


const getAllArtikel = async (req, res) => {
    try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Artikel.findAndCountAll({
        offset,
        limit,
        include: { model: Admin, attributes: ['email'] },
    });

    const totalPages = Math.ceil(count / limit);
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    res.render('admin/artikel/daftarArtikel', {
        artikel: rows,
        currentPage: parseInt(page),
        totalRecords: count,
        totalPages,
        recordsPerPage: limit,
        admin: adminInstance
    });
    } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
    }
};

const renderTambahArtikel = async (req, res) => {
try {
    const oldData = req.flash('oldData')[0] || {};
    const admins = await Admin.findAll();
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    res.render('admin/artikel/tambahArtikel', { admins, oldData, admin: adminInstance});
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const tambahArtikel = async (req, res) => {
try {
    const { judul, konten, gambar, kategori, admin_id } = req.body;
    const inputan = await Artikel.create({ judul, konten, gambar, kategori, admin_id });

    const title = inputan.judul;
    const artikelInstance = await Artikel.findOne({ where: { judul: title } });
    if (req.file) {
        const filePath = `/${req.file.path.replace(/public\\/g, '').replace(/\\/g, '/')}`;
        artikelInstance.gambar = filePath;
        await artikelInstance.save();
    }
    res.redirect('/admin/artikel')
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const renderUbahArtikel = async (req, res) => {
try {
    const artikel = await Artikel.findByPk(req.params.id, {
    include: { model: Admin, attributes: ['email'] } 
    });
    const admins = await Admin.findAll();
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    res.render('admin/artikel/ubahArtikel', { artikel, admins, admin: adminInstance });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


const ubahArtikel = async (req, res) => {
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

const hapusArtikel = async (req, res) => {
    try {
    const { alumniIds } = req.body;

    if (!alumniIds || !Array.isArray(alumniIds) || alumniIds.length === 0) {
        return res.status(400).json({ error: 'No artikel IDs provided' });
    }

    const deletedArticles = await Artikel.destroy({
        where: {
        id: alumniIds,
        },
    });

    res.status(200).json({ message: `${deletedArticles} articles deleted successfully` });
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


const editArtikel = async (req, res) => {
    try {
        const artikelId = req.params.id;
        const artikel = await Artikel.findByPk(artikelId);
        
        if (artikel.length === 0) {
            return res.status(404).send('Article not found');
        }
        const oldData = req.flash('oldData')[0] || {};
        const admins = await Admin.findAll();
        console.log(artikel)
        adminEmail = req.session.user.email;
        const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
        res.render('admin/artikel/editArtikel', {artikel: artikel, editing: true, admins,  admin: adminInstance});
    } catch (error) {
        console.error('Error fetching article for editing:', error);
        res.status(500).send('Server error');
    }
    };

    const updateArtikel = async (req, res) => {
        try {
            const artikelId = req.params.id;
            const { judul, konten, kategori } = req.body;
    
            await Artikel.update(
                { judul, konten, kategori }, 
                { where: { id: artikelId } }  
            );
    
            res.redirect('/admin/artikel');
        } catch (error) {
            console.error('Error updating article:', error);
            res.status(500).send('Server error');
        }
        };

module.exports = {
    getAllArtikel,
    renderTambahArtikel,
    tambahArtikel,
    renderUbahArtikel,
    ubahArtikel,
    hapusArtikel,
    uploadPhoto,
    editArtikel,
    updateArtikel
};
