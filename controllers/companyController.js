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


module.exports = {
    createCompany,
    // getCompanies,
    // getSpecificCompany,
    // updateCompany,
    // deleteCompany
}