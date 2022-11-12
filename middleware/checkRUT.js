const rutlib = require('rutlib')
const Company = require('../models/company')

const checkRUT = (req, res, next) => {
    const rut = req.body.rut
    if (rutlib.validateRut(rut)) {
        Company.findOne({ rut }, (err, company) => {
            if (err) {
                return res.status(500).send({ message: 'Error en la petición' })
            }
            if (company) {
                return res.status(200).send({ message: 'El RUT ya existe' })
            }
            next()
        })
    } else {
        return res.status(400).send({ message: 'RUT invalido' })
    }
}

module.exports = checkRUT