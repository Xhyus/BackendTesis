const Quotes = require('../models/quotes');
const Company = require('../models/company');
const Services = require('../models/service');

const createQuote = (req, res) => {
    const { name, description, services, company } = req.body;
    Services.find({ _id: { $in: services } }, (err, services) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar servicios' });
        }
        if (!services) {
            return res.status(404).send({ message: 'No hay servicios' });
        }
        const quoteServices = services.map(service => {
            return {
                service: service._id,
                price: service.price
            }
        })
        const quote = new Quotes({
            name,
            description,
            price: services.reduce((acc, service) => acc + service.price, 0),
            quoteServices,
            company
        });
        quote.save((err, quoteStored) => {
            if (err) {
                return res.status(500).send({ message: 'Error al guardar cotización' });
            }
            if (!quoteStored) {
                return res.status(404).send({ message: 'No se ha guardado la cotización' });
            }
            Company.findByIdAndUpdate(company, { $push: { quotes: quoteStored._id } }, { new: true }, (err, companyUpdated) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al actualizar empresa' });
                }
                if (!companyUpdated) {
                    return res.status(404).send({ message: 'No se ha podido actualizar la empresa' });
                }
                return res.status(200).send({ quote: quoteStored });
            })
        })
    })
}

module.exports = {
    createQuote
}