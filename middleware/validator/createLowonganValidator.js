const { body, validationResult } = require('express-validator');
exports.validateTambahLowongan = [
body('judul').notEmpty().withMessage('Judul lowongan harus diisi').isString().withMessage('Judul lowongan harus berupa teks'),
body('deskripsi').notEmpty().withMessage('Deskripsi lowongan harus diisi').isString().withMessage('Deskripsi lowongan harus berupa teks'),
body('tanggalTutup').notEmpty().withMessage('Tanggal tutup lowongan harus diisi').isISO8601().withMessage('Tanggal tutup lowongan harus dalam format ISO 8601'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        req.flash('oldData', req.body);
        return res.redirect('/admin/lowongan/tambah');
    }
    next();
},
];
