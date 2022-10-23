const Company = require('../models/company');

const createCompany = async (req, res) => {
    const { name, rut, address, phone, email, contact } = req.body;
    const newCompany = new Company({
        name,
        rut,
        address,
        phone,
        email,
        contact
    });
    newCompany.save((err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear la empresa' });
        }
        return res.status(201).send(company);
    });
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


module.exports = {
    createCompany,
    getCompanies,
    getSpecificCompany,
    // updateCompany,
    // deleteCompany
}