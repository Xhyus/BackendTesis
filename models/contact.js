const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        maxlength: 12
    },
    role: {
        type: String,
        required: true,
        maxlength: 100
    },
    rut: {
        type: String,
        required: true,
        maxlength: 12
    }
})

module.exports = mongoose.model('contact', contactSchema);