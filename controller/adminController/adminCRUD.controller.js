const db = require('../../models');
const Alumni = db.alumni;
const admin = db.admin;
const bcrypt = require("bcrypt");
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/images/admin/'); 
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
        }
    });
    
    const upload = multer({ storage: storage,  limits: { fileSize: 1024 * 1024 * 5 } });

const updatephotoProfile = async (req, res) => {
    try {
        const { email } = req.session.user;
        const adminInstance = await admin.findOne({ where: { email } });
        if (!adminInstance) {
            return res.status(404).send('Alumni not found');
        }

        const oldpath = adminInstance.gambar;
        const id = adminInstance.id;

        if (oldpath) {
            const oldFilePath = path.join('public', oldpath.replace(/^\//, ''));
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
                console.log('Old file deleted successfully');
            }
        }

        if (!req.file) {
            return res.status(400).send('No profile picture provided');
        }

        const filePath = '/' + req.file.path.split(path.sep).slice(1).join('/');
        adminInstance.gambar = filePath;
        await adminInstance.save();

        return res.redirect('/admin/profile');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

const uploadPhoto = (req, res, next) => {
    upload.single('gambar')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size is too large. Max limit is 5MB' });
            }
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }

    next()
    });
};

const getAllAlumni = async (req, res) => {
    try {
    const { page = 1, limit = 10 } = req.query; 
    const oldData = req.flash('oldData')[0] || {};
    const offset = (page - 1) * limit; 

    const { count, rows } = await Alumni.findAndCountAll({
        offset,
        limit,
    });

    const totalPages = Math.ceil(count / limit);
    const adminEmail = req.session.user.email;
    const adminInstance = await admin.findOne({where: {email: adminEmail}})
    
    res.render('admin/manage_alumni/alumni', {
        alumni: rows,
        currentPage: parseInt(page),
        totalRecords: count,
        totalPages,
        recordsPerPage: limit,
        oldData, messages: req.flash(),
        admin: adminInstance
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createAlumni = async (req, res) => {
    try {
        const { nim, email, name, password } = req.body;
        const gambar = req.file;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const existingAlumni = await Alumni.findOne({ where: { email } });
        if (existingAlumni) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let gambarPath = null;
        if (gambar) {
            
            gambarPath = `/images/alumni/${gambar.filename}`;
        }

        const newAlumni = await Alumni.create({
            nim,
            email,
            name,
            password: hashedPassword,
            roleId: 2,
            gambar: gambarPath,
        });

        return res.redirect('/admin/lihat/alumni');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAlumni = async (req, res) => {
    try {
    
        const alumniIdsToDelete = req.body.alumniIds;
        console.log(req.body.alumniIds) 

        if (!alumniIdsToDelete || !Array.isArray(alumniIdsToDelete) || alumniIdsToDelete.length === 0) {
            return res.status(400).json({ error: 'Invalid alumni IDs provided for deletion.' });
        }

    
        const deletedCount = await Alumni.destroy({
            where: { id: alumniIdsToDelete } 
        });

        if (deletedCount === alumniIdsToDelete.length) {
            res.status(200).json({ message: 'Alumni deleted successfully!' });
        } else {
            return res.json({ 
                message: `Deleted ${deletedCount} alumni. Some may not have been found.`,
                deletedCount,
                notFoundCount: alumniIdsToDelete.length - deletedCount 
            });
        }

    } catch (error) {
        console.error('Error deleting alumni:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateAlumni = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { id, nim, email, name, password } = req.body;
        const gambar = req.file; 
        console.log(id)

        const alumni = await Alumni.findByPk(id);
        if (!alumni) {
            return res.status(404).json({ error: 'Alumni not found' });
        }


        alumni.nim = nim;
        alumni.email = email;
        alumni.name = name;

    
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            alumni.password = hashedPassword;
        }


        if (gambar) {
            const filePath = `/${gambar.path.replace(/public\\/g, '').replace(/\\/g, '/')}`;
            alumni.gambar = filePath;
        }

        await alumni.save();

        return res.redirect('/admin/lihat/alumni')
    } catch (error) {
        console.error('Error updating alumni:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    updatephotoProfile,
    uploadPhoto,
    getAllAlumni,
    createAlumni,
    deleteAlumni,
    updateAlumni
}