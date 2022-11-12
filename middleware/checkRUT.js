const rutlib = require('rutlib')
const Company = require('../models/company')

const checkRUT = (req, res, next) => {
    if (rutlib.validateRut(req.body.rut) && rutlib.validateRut(req.body.contactRut)) {
        Company.findOne({ rut }, (err, company) => {
            if (err) {
                return res.status(500).send({ message: 'Error en la petición' })
            }
            if (company) {
                return res.status(400).send({ message: 'El RUT ya existe' })
            }
            next()
        })
    } else {
        return res.status(400).send({ message: 'RUT invalido' })
    }
}

module.exports = checkRUT