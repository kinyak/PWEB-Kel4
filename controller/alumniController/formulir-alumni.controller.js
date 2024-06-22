const { where } = require('sequelize');
const db = require('../../models');
const FormulirAlumni = db.formulir_alumni;
const Alumni = db.alumni;
const Admin = db.admin;
const DetailFormulir = db.detail_formulir;
const Provinsi = db.provinsi;
const PeriodeTracerStudy = db.periode_tracer_study
const { Sequelize } = require('../../models');
const { Op } = Sequelize;
const ExcelJS = require('exceljs');


exports.renderFormulirAlumni = async (req, res) => {
    try {
        const provinsi = await Provinsi.findAll()
        const adminEmail = req.session.user.email;
        const adminInstance = await Admin.findOne({where: {email: adminEmail}})
        const oldData = req.flash('oldData')[0] || {}; 
        alumniEmail = req.session.user.email;
        const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
        res.render('alumni/form/form', { title: 'Buat Formulir', provinsi,admin:adminInstance, oldData, messages: req.flash(), alumni: alumniInstance });
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };


exports.createFormulirAlumni = async (req, res) => {
    try {

        const {
        nama,
        nim,
        email,
        nomorkontak,
        angkatanlulus,
        programstudis1,
        programstudis2,
        programstudis3,
        pendprofesi,
        waktu_tunggu,
        tempatbekerja,
        jabatan,
        domisili,
        hobi,
        masukansaran,
        } = req.body;
    

        const formulirAlumni = await FormulirAlumni.create({
        nama,
        nim,
        email,
        nomorkontak,
        angkatanlulus,
        prodi_s1: programstudis1,
        prodi_s2: programstudis2,
        prodi_s3: programstudis3,
        pend_profesi: pendprofesi,
        waktu_tunggu,
        tempat_bekerja: tempatbekerja,
        jabatan,
        alamat_domis: domisili,
        hobi,
        masukan_saran: masukansaran,
        });
    

        const alumni = await Alumni.findOne({where: {email: req.session.user.email } })
        const currentPeriod = await PeriodeTracerStudy.findOne({
            where: {
                tanggal_mulai: { [Op.lte]: new Date() }, 
                tanggal_akhir: { [Op.gte]: new Date() } 
            }
        });
            const detailFormulir = await DetailFormulir.create({
            alumni_id: alumni.id,
            formulir_id: formulirAlumni.id,
            periode_tracer_studyId: currentPeriod.id
    
            });
        res.redirect('/alumni/form/lihat');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    };


exports.getAllFormulirAlumni = async (req, res) => {
try {
    const { page = 1, limit = 10 } = req.query; 
    const offset = (page - 1) * limit; 
    const { count, rows } = await FormulirAlumni.findAndCountAll({
        offset,
        limit,
        include: [
            {
            model: Alumni,
            
            through: {
                model: DetailFormulir,
                attributes: ['alumni_id', 'formulir_id'],
                
            },
            },
        ],
    });


    const totalPages = Math.ceil(count / limit);

    let selectedRecord = null;
    if (true) {

        selectedRecord = rows[0];     
    }
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    res.render('admin/form/daftarform', {formulirAlumni: rows,
        currentPage: parseInt(page),
        totalRecords: count,
        totalPages,
        recordsPerPage: limit,
        selectedRecord: req.query.id ? await FormulirAlumni.findByPk(req.query.id) : null,
        admin: adminInstance
    })
} catch (err) {
    res.status(400).json({ error: err.message });
}
};


exports.getFormulirForCurrentUser = async (req, res) => {
    try {
    const currentUserId = req.session.user.id; 
    const formulirAlumni = await FormulirAlumni.findAll({
        include: [
        {
            model: Alumni,
            where: { id: currentUserId }, 
            through: {
            model: DetailFormulir,
            attributes: ['alumni_id', 'formulir_id'],
            },
        },
        ],
    });
    alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
res.render('alumni/form/lihatform', { formulirAlumni, messages: req.flash(), alumni: alumniInstance });
    } catch (err) {
        req.flash('error', 'Ada error');
    res.status(400).json({ error: err.message });
    }
};


exports.createFormulirAlumniById = async (req, res, next) => {
    try {
    const formulirAlumni = await FormulirAlumni.findByPk(req.params.id, {});
    if (!formulirAlumni) {
        return res.status(404).json({ error: 'Formulir alumni not found' });
    }
    alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
    res.render('alumni/form/form', { title: 'Buat Formulir', formulirAlumni, alumni: alumniInstance });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};


exports.updateFormulirAlumni = async (req, res) => {
try {
    const [updated] = await FormulirAlumni.update(req.body, {
    where: { id: req.params.id }
    });
    if (updated) {
    const updatedFormulirAlumni = await FormulirAlumni.findByPk(req.params.id, {
        include: [{ model: Alumni, through: Detail_formulir }]
    });
    res.json(updatedFormulirAlumni);
    } else {
    res.status(404).json({ error: 'Formulir alumni not found' });
    }
} catch (err) {
    res.status(400).json({ error: err.message });
}
};


exports.deleteFormulirAlumni = async (req, res) => {
    try {

        const alumniIdsToDelete = req.body.alumniIds;
        console.log(req.body.alumniIds)

        if (!alumniIdsToDelete || !Array.isArray(alumniIdsToDelete) || alumniIdsToDelete.length === 0) {
            return res.status(400).json({ error: 'Invalid alumni IDs provided for deletion.' });
        }


        console.log(alumniIdsToDelete)
        // 2. Perform the Deletion
        const deletedCount = await FormulirAlumni.destroy({
            where: { id: alumniIdsToDelete} 
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

exports.getFormulirAlumniById = async (req, res) => {
    try {
    const formulirId  = req.params.id;
    const formulir = await FormulirAlumni.findByPk(formulirId);
    if (!formulir) {
        return res.status(404).json({ error: 'Formulir not found' });
    }
    console.log(formulirId);
    res.json(formulir);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};


exports.canUploadFormulir = async (req, res, next) => {

    const userId = req.session.user.id
    const currentPeriod = await PeriodeTracerStudy.findOne({
        where: {
            tanggal_mulai: { [Op.lte]: new Date() },  
            tanggal_akhir: { [Op.gte]: new Date() }  
        }
    });
    console.log(currentPeriod)

    if (!currentPeriod) {
        req.flash('error', 'Maaf belum periode pengisian form');
        return res.redirect('/alumni/form/lihat'); 
    }


    const existingFormulir = await DetailFormulir.findOne({ 
        where: {
            alumni_id: userId,
            periode_tracer_studyId: currentPeriod.id
        }
    });
    console.log(existingFormulir)
    if (!currentPeriod || existingFormulir) {  
        req.flash('error', 'Anda sudah mengisi formulir');
        return res.redirect('/alumni/form/lihat'); 
    }


    next(); 
}


exports.generate_excel = async (req, res) => {
    try {
        console.log('Attempting to fetch all FormulirAlumni records');
        const formulirData = await FormulirAlumni.findAll();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Formulir Data');


        worksheet.addRow(['Nama', 'NIM', 'Email', 'Nomor Kontak', 'Angkatan Lulus', 'Program Studi S1', 'Fakultas', 'Provinsi', 'Tempat Bekerja', 'Jabatan', 'Alamat Domisili', 'Hobi', 'Masukan dan Saran']);

    
        formulirData.forEach(formulir => {
            worksheet.addRow([
                formulir.nama,
                formulir.nim,
                formulir.email,
                formulir.nomorkontak,
                formulir.angkatanlulus,
                formulir.prodi_s1,
                formulir.fakultas,
                formulir.provinsi,
                formulir.tempat_bekerja,
                formulir.jabatan,
                formulir.alamat_domis,
                formulir.hobi,
                formulir.masukan_saran
            ]);
        });


        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=formulir_data.xlsx');

    
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).send('Error generating Excel file');
    }
};