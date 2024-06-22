const express = require('express');
const router = express.Router();
const db = require('../../models');
const { Sequelize, Op } = require('sequelize');
const Provinsi = db.provinsi;
const Admin = db.admin;
const Session = db.sessions;
const FormulirAlumni = db.formulir_alumni;
const DetailFormulir = db.detail_formulir;
const PeriodeTracerStudy = db.periode_tracer_study;


router.get('/tracerstudy', async (req, res) => {
    try {
        // Get total number of alumni who filled the form
        const totalAlumni = await DetailFormulir.count({
        distinct: true,
        col: 'alumni_id'
        });
    
        // Get employment status
        const employmentStatus = await FormulirAlumni.findAll({
        attributes: [
            'tempat_bekerja',
            [Sequelize.fn('count', Sequelize.col('id')), 'count']
        ],
        group: ['tempat_bekerja']
        });
    
            // Get average time to get first job (assuming we have a 'waktu_tunggu' field)
                const avgTimeToJob = await FormulirAlumni.findOne({
                    attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('waktu_tunggu')), 'avgTime']
                    ],
                    raw: true
                });

                const avgTimeToJobValue = avgTimeToJob && avgTimeToJob.avgTime ? parseFloat(avgTimeToJob.avgTime) : null;
    
        // Get distribution of alumni by province
        const alumniByProvince = await FormulirAlumni.findAll({
        attributes: [
            'provinsi_nama',
            [Sequelize.fn('count', Sequelize.col('id')), 'count']
        ],
        group: ['provinsi_nama']
        });
        const adminEmail = req.session.user.email;
        adminInstance = await Admin.findOne({where: {email: adminEmail}})
        res.render('admin/report/reportTracerStudy', {
        totalAlumni,
        employmentStatus,
        alumniByProvince,
        avgTimeToJob: avgTimeToJobValue,
        admin: adminInstance
        });
    } catch (error) {
        console.error('Error fetching tracer study statistics:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/website', async (req, res) => {
    try {
        // Verify that Session model exists
        if (!Session) {
            throw new Error('Session model is not defined');
        }

        // Get total session count
        const totalSessions = await Session.count();

        // Get active sessions (not expired)
        const activeSessions = await Session.count({
            where: {
                expires: {
                    [Op.gt]: new Date()
                }
            }
        });

      // Get user type distribution
const adminSessions = await Session.count({
    where: Sequelize.literal("JSON_EXTRACT(`data`, '$.user.roleId') = 1")
});

const alumniSessions = await Session.count({
    where: Sequelize.literal("JSON_EXTRACT(`data`, '$.user.roleId') = 2")
});
        // Get sessions created in the last 24 hours
        const recentSessions = await Session.count({
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        });

        const adminEmail = req.session.user.email;
        const adminInstance = await Admin.findOne({where: {email: adminEmail}});

        res.render('admin/report/reportWebsite', {
            totalSessions,
            activeSessions,
            adminSessions,
            alumniSessions,
            recentSessions,
            admin: adminInstance
        });
    } catch (error) {
        console.error('Error fetching session data:', error);
        res.status(500).send('An error occurred while generating the report: ' + error.message);
    }
});

router.get('/getsebaranalumni', async (req, res) => {
    try {
        const alumniByProvince = await FormulirAlumni.findAll({
        attributes: [
            'provinsi_nama',
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        group: ['formulir_alumni.provinsi_nama'],
        include: [{
            model: Provinsi,
            attributes: ['latitude', 'longitude'],
            on: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('formulir_alumni.provinsi_nama')),
            '=',
            Sequelize.fn('LOWER', Sequelize.col('provinsi.nama'))
            ),
            required: false
        }],
        raw: true
        });
        
        res.json(alumniByProvince);
    } catch (error) {
        console.error('Error fetching alumni data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/sebaranalumni', async (req, res) => {
    const adminEmail = req.session.user.email;
        const adminInstance = await Admin.findOne({where: {email: adminEmail}})
        res.render('admin/report/reportSebaran', {admin:adminInstance})
});


module.exports = router;