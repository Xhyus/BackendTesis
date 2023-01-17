const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (user) => {
    const payload = {
        id: user._id
    }
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1h' })
}

module.exports = { createToken };