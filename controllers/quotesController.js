const Quotes = require('../models/quotes');
const Company = require('../models/company');
const Services = require('../models/service');

const createQuote = (req, res) => {
    const { name, description, services, company, formalization, payment, paymentMethod, documents } = req.body;
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
            documents
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
    Quotes.find({ created: { $gte: new Date(new Date().getTime() - 31 * 24 * 60 * 60 * 1000) }, active: true }).populate('company').exec((err, quotes) => {
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
    Quotes.findById(id).populate({ path: 'company', populate: { path: 'contact' } }).exec((err, quote) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar cotización' });
        }
        if (!quote) {
            return res.status(404).send({ message: 'No existe la cotización' });
        }
        return res.status(200).send(quote);
    })
}

const updateQuote = (req, res) => {
    const { id } = req.params;
    const { services } = req.body;
    Services.find({ _id: { $in: services } }, (err, services) => {
        if (err) {
            return res.status(500).send({ message: 'Error al buscar servicios' });
        }
        if (!services) {
            return res.status(404).send({ message: 'No hay servicios' });
        }
        req.body.quoteServices = services.map(service => {
            return {
                service: service._id,
                price: service.price
            }
        })
        req.body.price = services.reduce((acc, service) => acc + service.price, 0);
        Quotes.findByIdAndUpdate(id, req.body, { new: true }).populate({ path: 'company', populate: { path: 'contact' }, path: 'services' }).exec((err, quoteUpdated) => {
            if (err) {
                return res.status(500).send({ message: 'Error al actualizar cotización' });
            }
            if (!quoteUpdated) {
                return res.status(404).send({ message: 'No se ha podido actualizar la cotización' });
            }
            return res.status(200).send({ quote: quoteUpdated });
        })
    })
}

const deleteQuote = (req, res) => {
    const { id } = req.params;
    Quotes.findByIdAndUpdate(id, { status: false }, { new: true }, (err, quoteUpdated) => {
        if (err) {
            return res.status(500).send({ message: 'Error al eliminar cotización' });
        }
        if (!quoteUpdated) {
            return res.status(404).send({ message: 'No se ha podido eliminar la cotización' });
        }
        return res.status(200).send({ quote: quoteUpdated });
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
        const oldQuotes = company.quotes.filter(quote => {
            let today = new Date();
            let quoteDate = new Date(quote.created);
            let diffTime = Math.abs(today - quoteDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 31;
        })
        const validQuotes = company.quotes.filter(quote => {
            let today = new Date();
            let quoteDate = new Date(quote.created);
            let diffTime = Math.abs(today - quoteDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 31;
        })
        return res.status(200).send({ validQuotes, oldQuotes });
    })
}

module.exports = {
    createQuote,
    getQuotesByCompany,
    getQuotes,
    getActiveQuotes,
    getQuote,
    updateQuote,
    deleteQuote
}