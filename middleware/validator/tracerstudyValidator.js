const { body, validationResult } = require('express-validator');

exports.validateTambahPeriodeTracerStudy = [
body('nama_periode')
    .notEmpty().withMessage('Nama periode harus diisi')
    .isString().withMessage('Nama periode harus berupa teks'),
body('keterangan')
    .optional({ nullable: true })
    .isString().withMessage('Keterangan harus berupa teks'),
body('tanggal_mulai')
    .notEmpty().withMessage('Tanggal mulai harus diisi')
    .isISO8601().withMessage('Tanggal mulai harus dalam format ISO 8601'),
body('tanggal_akhir')
    .notEmpty().withMessage('Tanggal akhir harus diisi')
    .isISO8601().withMessage('Tanggal akhir harus dalam format ISO 8601'),
body('admin_id')
    .notEmpty().withMessage('ID admin harus diisi'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        req.flash('oldData', req.body);
        return res.redirect('/admin/tracerstudy/tambah');
    }
    next();
}
];  