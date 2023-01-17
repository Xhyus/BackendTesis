const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(6, 'hours').unix(),
    }
    return jwt.encode(payload, process.env.SECRET_TOKEN)
}

module.exports = { createToken };