const db = require('../../models');
const PengajuanEvent = db.pengajuan_event;
const Alumni = db.alumni;
const Admin = db.admin;
const FormPengajuanEvent = db.form_pengajuan_event;
const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const { faker } = require('@faker-js/faker');


exports.createEvent = async (req, res) => {
try {
    const { judul, deskripsi, tanggal } = req.body;
    const alumniId = req.session.user.id
    const formPengajuanEvent = await FormPengajuanEvent.create({
    judul,
    deskripsi,
    tanggal_event: tanggal,
    });
    const event = await PengajuanEvent.create({
    status: 'diajukan',
    deskripsi,
    alumni_id: alumniId,
    pengajuan_event_id: formPengajuanEvent.id,
    });
    res.redirect('/alumni/event/')
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

exports.renderEvent = async (req, res) => {
    alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
    const oldData = req.flash('oldData')[0] || {};
    res.render('alumni/pengajuan_event/tambahEvent', {oldData, messages: req.flash(), alumni: alumniInstance})
}


exports.getEventsByAlumni = async (req, res) => {
    try {
        const alumniId = req.session.user.id;

    const { page = 1, limit = 10 } = req.query; 
    const offset = (page - 1) * limit; 

    const { count, rows } = await PengajuanEvent.findAndCountAll({
        where: { alumni_id: alumniId },
        include: [
            {
                model: FormPengajuanEvent,
                as: 'form',
                attributes: ['id', 'judul', 'deskripsi', 'tanggal_event'],
            },
        ],
        limit,
        offset,
    });

    
    const alumni = await Alumni.findByPk(alumniId, {
        include: [
        {
            model: FormPengajuanEvent,
            as: 'form_pengajuan_events',
            attributes: ['id', 'judul', 'deskripsi', 'tanggal_event'],
            include: [
            {
                model: PengajuanEvent,
                as: 'pengajuan_events', 
                attributes: ['status'],
            },
            ],
        },
        ],
    });

    if (!alumni) {
        return res.status(404).json({ error: 'Alumni not found' });
    }

    const events = alumni.form_pengajuan_events;

    const totalPages = Math.ceil(count / limit); 
    alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
    res.render('alumni/pengajuan_event/lihatEvent', { events, alumniId, currentPage: parseInt(page),
        totalRecords: count,
        totalPages,
        recordsPerPage: limit,
        alumni:alumniInstance });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};




exports.getAllEvents = async (req, res) => {
    try {
    const { page = 1, limit = 10 } = req.query; 
    const offset = (page - 1) * limit; 
    const { count, rows } = await PengajuanEvent.findAndCountAll({
        offset,
        limit,
        include: [
        {
        model: FormPengajuanEvent,
        as: 'form',
        attributes: ['id','judul', 'deskripsi', 'tanggal_event', ]
        },
        {
        model: Alumni,
        as: 'alumni',
        attributes: ['name'] 
        }
    ]
    });
    adminEmail = req.session.user.email;
    const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
    const totalPages = Math.ceil(count / limit); 
    res.render('admin/pengajuan_event/daftarEvent', {
        event: rows,
        currentPage: parseInt(page),
        totalRecords: count,
        totalPages,
        recordsPerPage: limit,
        admin:adminInstance
    });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};


exports.updateEventStatus = async (req, res) => {
    try {
        const { alumniId, pengajuanEventId } = req.params;
        const { status } = req.body;

    
        const event = await PengajuanEvent.findOne({
            where: {
                alumni_id: alumniId,
                pengajuan_event_id: pengajuanEventId
            },
            include: [
                { model: Alumni,as: 'alumni', attributes: ['name', 'email'] },
                { model: FormPengajuanEvent,as: 'form', attributes: ['judul', 'deskripsi', 'tanggal_event'] },
            ]
        });

        if (!event) {
            return res.status(404).json({ error: 'Event tidak ditemukan' });
        }

    
        event.status = status;
        await event.save();

        res.redirect('/admin/event')
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.hapusEvent = async (req, res) => {
    try {
    const { alumniIds } = req.body;

    if (!alumniIds || !Array.isArray(alumniIds) || alumniIds.length === 0) {
        return res.status(400).json({ error: 'No artikel IDs provided' });
    }


    const deletedArticles = await FormPengajuanEvent.destroy({
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
async function fetchEventFromDatabase(req, eventId) {
    try {
    const alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({where: {email: alumniEmail}})
    const event = await PengajuanEvent.findOne({
        where: {
            alumni_id: alumniInstance.id,
            pengajuan_event_id: eventId
        }
        , 
        include: [
        {
            model: FormPengajuanEvent,
            as: 'form',
            attributes: ['id', 'judul', 'deskripsi', 'tanggal_event'],
        },
        {
            model: Alumni,
            as: 'alumni',
            attributes: ['name'],
        },
        ],
    });
    console.log(event)

    if (!event) {
        return {};
    }

    const formattedEvent = {
        form: {
        id: event.form.id,
        judul: event.form.judul,
        deskripsi: event.form.deskripsi,
        tanggal_event: event.form.tanggal_event,
        },
        alumni: {
        name: event.alumni.name,
        },
    };
    console.log(formattedEvent)
    return formattedEvent;
    } catch (error) {
    console.error('Error fetching event data:', error);
    return {};
    }
}

async function renderTemplate(templatePath, event) {
    const filePath = path.join(__dirname, '..', 'views', templatePath);
    const html = await ejs.renderFile(filePath, { event }, { async: true });
    return html;
}

exports.generatepdf = async (req, res) => {
    try {
        
        const eventId = req.params.eventId;
        
        const event = await fetchEventFromDatabase(req, eventId);
    
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        event.nomorSurat = faker.string.alphanumeric(10);          
        event.penanggungJawab = faker.person.fullName(); 
        event.jabatan = faker.person.jobTitle();             
        event.lokasi = 'Fakultas Teknologi Informasi';             
        event.tempatSurat = faker.location.city();              
        event.tanggalSurat = faker.date.anytime().toLocaleDateString('id-ID');     
    
        const templatePath = './templates/surat_persetujuan_event.html';
        const html = await renderTemplate(templatePath, event);
    
        await page.setContent(html);
    
    
        const pdfBuffer = await page.pdf({ format: 'A4' });
    
    
        await browser.close();
    
    
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="surat_persetujuan_event.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
}