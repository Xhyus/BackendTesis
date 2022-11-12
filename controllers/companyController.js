const Company = require('../models/company');
const Contact = require('../models/contact');

const createCompany = (req, res) => {
    const { name, rut, address, phone, email, socialReason, state, contactName, contactRut, contactPhone, contactEmail, contactRole } = req.body;
    let newCompany
    // check if contactPhone and phone contains at the beginning +56
    if (contactPhone.charAt(0) !== '+' && contactPhone.charAt(1) !== '5' && contactPhone.charAt(2) !== '6') {
        contactPhone = '+56' + contactPhone
    }
    if (phone.charAt(0) !== '+' && phone.charAt(1) !== '5' && phone.charAt(2) !== '6') {
        phone = '+56' + phone
    }
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