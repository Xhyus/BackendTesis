const jwt = require('jsonwebtoken')
const moment = require('moment')
require('dotenv').config()

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    console.log({ token })
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        if (decoded.exp <= moment().unix()) {
            return res.status(401).json({ message: 'Token expired' })
        }
        req.user = decoded.sub
        console.log("middleware auth completado")
        next()
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = { auth };