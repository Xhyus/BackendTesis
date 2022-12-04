const Company = require('../models/company');
const Contact = require('../models/contact');
const { sendMail } = require('../services/transporter');

const createCompany = (req, res) => {
    const { name, rut, address, phone, email, socialReason, state, contactName, contactRut, contactPhone, contactEmail, contactRole } = req.body;
    let newCompany
    const newContact = new Contact({
        name: contactName,
        rut: contactRut,
        phone: contactPhone,
        email: contactEmail,
        role: contactRole,
    });
    try {
        newContact.save((err, contact) => {
            if (err) {
                return res.status(400).send({ message: 'Error al crear el contacto' });
            }
            if (state === 'unconstituted') {
                newCompany = new Company({
                    name,
                    rut,
                    phone,
                    email,
                    contact: contact._id,
                });
            } else {
                newCompany = new Company({
                    name,
                    rut,
                    address,
                    phone,
                    email,
                    socialReason,
                    contact: contact._id
                });
            }
            newCompany.save((err, company) => {
                if (err) {
                    if (err.code === 11000) {
                        return res.status(406).send({ message: 'La empresa ya existe' });
                    }
                    return res.status(400).send({ message: 'Error al crear la empresa' });
                }
                sendMail(name)
                return res.status(201).send(company);
            })
        })
    } catch (error) {
        return res.status(400).send({ message: 'Por favor revise los datos ingresados' });
    }
}

const getCompanies = async (req, res) => {
    Company.find({}).populate('contact').exec((err, companies) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener las empresas' });
        }
        return res.status(200).send(companies);
    })
}

const getSpecificCompany = async (req, res) => {
    const { id } = req.params;
    Company.findById(id).populate('contact').exec((err, company) => {
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
    const { name, rut, address, phone, email, socialReason, contactName, contactRut, contactPhone, contactEmail, contactRole, state } = req.body;
    Company.findById(id, (err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        Contact.findByIdAndUpdate(company.contact, { name: contactName, rut: contactRut, phone: contactPhone, email: contactEmail, role: contactRole }, { new: true }, (err, contact) => {
            if (err) {
                return res.status(400).send({ message: 'Error al actualizar el contacto' });
            }
            if (!contact) {
                return res.status(404).send({ message: 'Contacto no encontrado' });
            }
            if (state === 'unconstituted') {
                Company.findByIdAndUpdate(id, { name, rut, phone, email }, (err, company) => {
                    if (err) {
                        return res.status(400).send({ message: 'Error al actualizar la empresa' });
                    }
                    if (!company) {
                        return res.status(404).send({ message: 'Empresa no encontrada' });
                    }
                    return res.status(200).send(company);
                })
            } else {
                Company.findByIdAndUpdate(id, { name, rut, address, phone, email, socialReason }, (err, company) => {
                    if (err) {
                        return res.status(400).send({ message: 'Error al actualizar la empresa' });
                    }
                    if (!company) {
                        return res.status(404).send({ message: 'Empresa no encontrada' });
                    }
                    return res.status(200).send(company);
                })
            }

        })
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