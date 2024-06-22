const { body, validationResult } = require('express-validator');

exports.validateCreateEvent = [
body('judul')
    .notEmpty()
    .withMessage('Judul event harap diisi '),
body('deskripsi')
    .notEmpty()
    .withMessage('Deskripsi harap diisi '),
body('tanggal')
    .notEmpty()
    .withMessage('Tanggal harap diisi ')
    .isDate()
    .withMessage('Tanggal harus valid'),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        req.flash('oldData', req.body);
        return res.redirect('/alumni/event/upload');
    }
    next();
},
];