const { body, validationResult } = require('express-validator');
const db = require('../../models');
const Alumni = db.alumni;

exports.validateCreateAlumni = [
body('nim').notEmpty().withMessage('NIM is required'),
body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address').normalizeEmail().custom(async (value) => {
    const existingAlumni = await Alumni.findOne({ where: { email: value } });
    if (existingAlumni) {
        return Promise.reject('Email already exists');
    }
    }),
body('name').notEmpty().withMessage('Name is required'),
body('password').notEmpty().withMessage('Password is required'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        req.flash('oldData', req.body);
        return res.redirect('/admin/lihat/alumni');
    }
    next();
},
];
