const Quotes = require('../models/quotes');
const Company = require('../models/company');

const createQuote = (req, res) => {
    const { name, description, price, quoteServices, company } = req.body;
    const newQuote = new Quotes({
        name,
        description,
        price,
        quoteServices,
        company
    });
    try {
        newQuote.save((err, quote) => {
            if (err) {
                return res.status(400).send({ message: "Error al crear la cotizacion" });
            }
            Company.findByIdAndUpdate(company, { $push: { quotes: quote._id } }, { new: true }, (err, company) => {
                if (err) {
                    return res.status(400).send({ message: "Error al crear la cotizacion" });
                }
                if (!company) {
                    return res.status(404).send({ message: 'No se ha encontrado la empresa' });
                }
                return res.status(201).send(quote);
            });
        })
    }
    catch (err) {
        return res.status(500).send({ message: "Error al crear la cotización" });
    }
}

module.exports = {
    createQuote
}