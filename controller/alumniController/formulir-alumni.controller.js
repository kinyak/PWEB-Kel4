const db = require('../../models');
const FormulirAlumni = db.formulir_alumni;
const Alumni = db.alumni;
const DetailFormulir = db.detail_formulir;
const PeriodeTracerStudy = db.periode_tracer_study
// const { Alumni, FormulirAlumni, Detail_formulir, PeriodeTracerStudy } = require('../../models');

// Create a new formulir alumni
exports.createFormulirAlumni = async (req, res) => {
try {
    const formulirAlumni = await FormulirAlumni.create(req.body);
    res.status(201).json(formulirAlumni);
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

// Get all formulir alumni
exports.getAllFormulirAlumni = async (req, res) => {
try {
    const formulir_Alumni = await FormulirAlumni.findAll({
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
    res.json(formulir_Alumni);
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

// Get a single formulir alumni by ID
exports.getFormulirAlumniById = async (req, res) => {
try {
    const formulirAlumni = await FormulirAlumni.findByPk(req.params.id, {
        include: [
            {
            model: FormulirAlumni,
            through: {
                model: Detail_formulir,
                include: [
                {
                    model: PeriodeTracerStudy,
                },
                ],
            },
            },
        ],
    });
    if (!formulirAlumni) {
    return res.status(404).json({ error: 'Formulir alumni not found' });
    }
    res.json(formulirAlumni);
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

// Update an existing formulir alumni
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

// Delete a formulir alumni
exports.deleteFormulirAlumni = async (req, res) => {
try {
    const deleted = await FormulirAlumni.destroy({
    where: { id: req.params.id }
    });
    if (deleted) {
    res.status(204).send();
    } else {
    res.status(404).json({ error: 'Formulir alumni not found' });
    }
} catch (err) {
    res.status(400).json({ error: err.message });
}
};