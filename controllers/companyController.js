const Company = require('../models/company');
const Contact = require('../models/contact');
const Signed = require('../models/signed')
const { sendMail } = require('../services/transporter');

const createCompany = (req, res) => {
    const { name, rut, address, phone, email, socialReason, state, contactName, contactRut, contactPhone, contactEmail, contactRole, signedID } = req.body;
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
                Signed.findByIdAndUpdate(signedID, { type: "signed" })
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
    Company.findById(id).populate('contact quotes').exec((err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        let expiredQuote = []
        let validQuote = []
        company.quotes.forEach(quote => {
            if (quote.end < Date.now()) {
                expiredQuote.push(quote)
            } else {
                validQuote.push(quote)
            }
        })
        let companyValues = {
            _id: company._id,
            name: company.name,
            rut: company.rut,
            address: company.address,
            phone: company.phone,
            email: company.email,
            socialReason: company.socialReason,
            contact: company.contact,
            expiredQuote: expiredQuote,
            validQuote: validQuote
        }
        return res.status(200).send(companyValues);
    })
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const companyValues = {
        name: req.body.name,
        rut: req.body.rut,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        socialReason: req.body.state === 'constituted' ? req.body.socialReason : undefined,
    }
    const contactValues = {
        name: req.body.contactName,
        rut: req.body.contactRut,
        phone: req.body.contactPhone,
        email: req.body.contactEmail,
        role: req.body.contactRole
    }
    Company.findById(id, (err, company) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener la empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'Empresa no encontrada' });
        }
        Contact.findByIdAndUpdate(company.contact, contactValues, { new: true }, (err, contact) => {
            if (err) {
                return res.status(400).send({ message: 'Error al actualizar el contacto' });
            }
            if (!contact) {
                return res.status(404).send({ message: 'Contacto no encontrado' });
            }
            Company.findByIdAndUpdate(id, companyValues, { new: true }, (err, company) => {
                if (err) {
                    return res.status(400).send({ message: 'Error al actualizar la empresa' });
                }
                if (!company) {
                    return res.status(404).send({ message: 'Empresa no encontrada' });
                }
                return res.status(200).send(company);
            })
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