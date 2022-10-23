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

const getContacts = async (req, res) => {
    Contact.find((err, contacts) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los contactos' });
        }
        return res.status(200).send(contacts);
    })
}

const getSpecificContact = async (req, res) => {
    const { id } = req.params;
    Contact.findById(id, (err, contact) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el contacto' });
        }
        if (!contact) {
            return res.status(404).send({ message: 'Contacto no encontrado' });
        }
        return res.status(200).send(contact);
    })
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role, rut } = req.body;
    Contact.findByIdAndUpdate(id, { name, email, phone, role, rut }, { new: true }, (err, contact) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar el contacto' });
        }
        if (!contact) {
            return res.status(404).send({ message: 'Contacto no encontrado' });
        }
        return res.status(200).send(contact);
    })
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    Contact.findByIdAndDelete(id, (err, contact) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar el contacto' });
        }
        if (!contact) {
            return res.status(404).send({ message: 'Contacto no encontrado' });
        }
        return res.status(200).send({ message: 'Contacto eliminado' });
    })
}

module.exports = {
    createContact,
    getContacts,
    getSpecificContact,
    updateContact,
    deleteContact
}