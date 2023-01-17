const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: "No hay token" })
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).send({ message: "Token no válido" })
        }
        console.log(decoded)
        // console log decoded.iat and decoded.exp with format: new Date(decoded.iat * 1000) and new Date(decoded.exp * 1000)
        console.log(new Date(decoded.iat * 1000))
        console.log(new Date(decoded.exp * 1000))
        req.user = decoded.id;
        next();
    });
}


module.exports = { auth };