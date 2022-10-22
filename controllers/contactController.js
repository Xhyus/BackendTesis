const Contact = require('../models/contact');
const Company = require('../models/company');

const createContact = async (req, res) => {
    const { name, email, phone, role, rut } = req.body;
    const { id } = req.params;
    const newContact = new Contact({
        name,
        email,
        phone,
        role,
        rut
    });
    newContact.save((err, contact) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear el contacto' });
        }
        Company.findByIdAndUpdate(id, { $set: { contact: contact._id } }, (err, company) => {
            if (err) {
                return res.status(400).send({ message: 'Error al actualizar la empresa' });
            }
            if (!company) {
                return res.status(404).send({ message: 'Empresa no encontrada' });
            }
            return res.status(200).send(company);
        })
    })
}


module.exports = {
    createContact,
    // getContacts,
    // getSpecificContact,
    // updateContact,
    // deleteContact
}