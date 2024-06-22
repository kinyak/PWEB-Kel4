const { body, validationResult } = require('express-validator');

exports.validateFormulirAlumni = [
body('nama').notEmpty().withMessage('Nama wajib diisi '),
body('nim').notEmpty().withMessage('NIM wajib diisi '),
body('email')
    .isEmail()
    .withMessage('Alamat email invalid ')
    .normalizeEmail(),
body('nomorkontak').notEmpty().withMessage('Nomor kontak diperlukan '),
body('provinsi')
        .notEmpty().withMessage('Pilih provinsi diperlukan')
        .custom(value => value !== 'Pilih provinsi').withMessage('Harap pilih provinsi yang valid'),
body('angkatanlulus')
        .notEmpty().withMessage('Angkatan Lulus diperlukan')
        .isInt({ min: 2015, max: 2024 }).withMessage('Angkatan Lulus harus antara 2015 dan 2024'),
body('programstudis1')
    .notEmpty()
    .withMessage('Program Studi (S1) harus diisi'),
body('tempatbekerja').optional(),
body('jabatan').optional(),
body('domisili').optional(),
body('hobi').optional(),
body('masukansaran').optional(),
body('waktu_tunggu')
    .optional()
    .isInt({ min: 1 }).withMessage('Waktu tunggu harus berupa angka positif'),


(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    req.flash('error', errorMessages);
    req.flash('oldData', req.body);
    return res.redirect('/alumni/form/upload'); // Redirect to the form route
    }
    next();
},
];