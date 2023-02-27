const jwt = require('jsonwebtoken')
const moment = require('moment')
require('dotenv').config()

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(8, 'hours').unix(),
    }
    return jwt.sign(payload, process.env.SECRET_TOKEN)
}

module.exports = { createToken };