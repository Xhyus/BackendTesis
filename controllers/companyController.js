const Company = require('../models/company');

const createCompany = (req, res) => {
    const { name, rut, address, phone, email, socialReason, state } = req.body;
    let newCompany
    if (state === 'unconstituted') {
        newCompany = new Company({
            name,
            rut,
            phone,
            email
        });
    } else {
        newCompany = new Company({
            name,
            rut,
            address,
            phone,
            email,
            socialReason
        });
    }
    try {
        newCompany.save((err, company) => {
            if (err) {
                return res.status(400).send({ message: 'Error al crear la empresa' });
            }
            return res.status(201).send(company);
        });
    } catch (error) {
        return res.status(400).send({ message: 'Por favor revise los datos ingresados' });
    }
}

const getCompanies = async (req, res) => {
    Company.find((err, companies) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener las empresas' });
        }
        return res.status(200).send(companies);
    })
}

const getSpecificCompany = async (req, res) => {
    const { id } = req.params;
    Company.findById(id, (err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        return res.status(200).send(company);
    })
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, rut, address, phone, email, contact, socialReason } = req.body;
    Company.findByIdAndUpdate(id, { name, rut, address, phone, email, contact, socialReason }, { new: true }, (err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        return res.status(200).send(company);
    })
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    Company.findByIdAndDelete(id, (err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        return res.status(200).send(company);
    })
}

module.exports = {
    createCompany,
    getCompanies,
    getSpecificCompany,
    updateCompany,
    deleteCompany
}