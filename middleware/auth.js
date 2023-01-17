const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: "No hay token" })
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Token no válido" })
        }
        req.user = decoded;
        next();
    });
}


module.exports = { auth };