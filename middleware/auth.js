const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const auth = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.token || cookies.token === 'null') {
        return res.status(401).send({ message: "No tienes autorización" })
    }
    try {
        const payload = jwt.decode(cookies.token, process.env.SECRET_TOKEN)
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: "El token ha expirado" })
        }
    } catch (err) {
        return res.status(401).send({ message: "Token inválido" })
    }
    next()
}

module.exports = { auth };