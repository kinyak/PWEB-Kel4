const db = require('../../models');
const Artikel = db.artikel;
const Admin = db.admin;

// Mendapatkan semua artikel
const getAllArtikel = async (req, res) => {
try {
    const artikel = await Artikel.findAll({
    include: { model: Admin, attributes: ['email'] } // Mengambil data admin terkait
    });
    res.render('admin/artikel/daftarArtikel', { artikel });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

// Render halaman tambah artikel
const renderTambahArtikel = async (req, res) => {
try {
    const admin = await Admin.findAll();
    res.render('admin/artikel/tambahArtikel', { admin });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

// Menambahkan artikel baru
const tambahArtikel = async (req, res) => {
try {
    const { judul, konten, gambar, kategori, admin_id } = req.body;
    await Artikel.create({ judul, konten, gambar, kategori, admin_id });
    res.redirect('/admin/artikel');
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

// Render halaman ubah artikel
const renderUbahArtikel = async (req, res) => {
try {
    const artikel = await Artikel.findByPk(req.params.id, {
    include: { model: Admin, attributes: ['email'] } // Mengambil data admin terkait
    });
    const admin = await Admin.findAll();
    res.render('admin/artikel/ubahArtikel', { artikel, admin });
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};

// Mengubah artikel
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

// Menghapus artikel
const hapusArtikel = async (req, res) => {
try {
    const artikel = await Artikel.findByPk(req.params.id);
    await artikel.destroy();
    res.redirect('/admin/artikel');
} catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
}
};


module.exports = {
    getAllArtikel,
    renderTambahArtikel,
    tambahArtikel,
    renderUbahArtikel,
    ubahArtikel,
    hapusArtikel
};
