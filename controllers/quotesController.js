const Quotes = require('../models/quotes');
const Company = require('../models/company');
const Services = require('../models/service');

const createQuote = (req, res) => {
    const { name, description, services, company, formalization, payment, paymentMethod, documents, projectDelivery } = req.body;
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
            company,
            formalization,
            payment,
            paymentMethod,
            documents,
            projectDelivery
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

const getQuotes = (req, res) => {
    Quotes.find().populate('company').exec((err, quotes) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar cotizaciones' });
        }
        if (!quotes) {
            return res.status(404).send({ message: 'No hay cotizaciones' });
        }
        return res.status(200).send(quotes);
    })
}
const getActiveQuotes = (req, res) => {
    Quotes.find({ end: { $gte: new Date() } }).populate({ path: "company", populate: { path: "contact" } }).exec((err, quotes) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar cotizaciones' });
        }
        if (!quotes) {
            return res.status(404).send({ message: 'No hay cotizaciones' });
        }
        return res.status(200).send(quotes);
    })
}

const getQuote = (req, res) => {
    const { id } = req.params;
    Quotes.findById(id).populate({ path: 'company ', populate: { path: 'contact' } }).populate({ path: 'quoteServices.service ', populate: { path: 'quoteServices.service item' } }).exec((err, quote) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar cotización' });
        }
        if (!quote) {
            return res.status(404).send({ message: 'No existe la cotización' });
        }
        return res.status(200).send(quote);
    })
}

const getClientQuote = (req, res) => {
    const { url } = req.params;
    Quotes.findOne({ url }).populate({ path: 'company ', populate: { path: 'contact' } }).populate({ path: 'quoteServices.service ', populate: { path: 'quoteServices.service item' } }).exec((err, quote) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar cotización' });
        }
        if (!quote) {
            return res.status(404).send({ message: 'No existe la cotización' });
        }
        return res.status(200).send(quote);
    })
}

const deleteQuote = (req, res) => {
    const { id } = req.params;
    Quotes.findByIdAndDelete(id, (err, quoteDeleted) => {
        if (err) {
            return res.status(500).send({ message: 'Error al borrar cotización' });
        }
        if (!quoteDeleted) {
            return res.status(404).send({ message: 'No se ha podido borrar la cotización' });
        }
        return res.status(200).send({ message: 'Cotización eliminada correctamente' });
    })
}

const getQuotesByCompany = (req, res) => {
    const { id } = req.params;
    Company.findById(id).populate('quotes').exec((err, company) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar empresa' });
        }
        if (!company) {
            return res.status(404).send({ message: 'No se ha encontrado la empresa' });
        }
        const oldQuotes = company.quotes.filter(quote => quote.end < new Date());
        const activeQuotes = company.quotes.filter(quote => quote.end >= new Date());
        return res.status(200).send({ oldQuotes, activeQuotes });
    })
}

module.exports = {
    createQuote,
    getQuotesByCompany,
    getQuotes,
    getActiveQuotes,
    getQuote,
    deleteQuote,
    getClientQuote
}