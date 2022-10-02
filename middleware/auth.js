const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const auth = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.token) {
        return res.status(403).send({ message: "No tienes autorización" })
    }
    const payload = jwt.decode(cookies.token, process.env.SECRET_TOKEN);
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: "El token ha expirado" })
    }
    req.user = payload.sub;
    next();
}

module.exports = { auth };