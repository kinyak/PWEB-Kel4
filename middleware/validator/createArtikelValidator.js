const { body, query, validationResult } = require('express-validator');

exports.validateTambahArtikel = [
query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page harus berupa angka positif')
    .toInt(),
query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit harus berupa angka positif')
    .toInt(),
body('judul')
    .notEmpty().withMessage('Judul artikel harus diisi')
    .isString().withMessage('Judul artikel harus berupa teks'),
body('konten')
    .notEmpty().withMessage('Konten artikel harus diisi')
    .isString().withMessage('Konten artikel harus berupa teks'),
body('gambar')
    .optional({ nullable: true })
    .isString().withMessage('Gambar artikel harus berupa teks'),
body('kategori')
    .notEmpty().withMessage('Kategori artikel harus diisi')
    .isString().withMessage('Kategori artikel harus berupa teks'),
body('admin_id')
    .notEmpty().withMessage('ID admin harus diisi')
    .isInt().withMessage('ID admin harus berupa angka'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        req.flash('oldData', req.body);
        return res.redirect('/admin/artikel/tambah');
    }
    next();
}
];