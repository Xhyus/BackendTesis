const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    socialReason: {
        type: String,
        maxlength: 100,
        default: null
    },
    address: {
        type: String,
        maxlength: 250,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true,
        maxlength: 12
    },
    phone: {
        type: String,
        required: true,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        maxlength: 100
    },
    contact: {
        type: Schema.ObjectId,
        ref: 'contact',
        required: true
    },
    quotes: [{
        type: Schema.ObjectId,
        ref: 'quote'
    }]
})

module.exports = mongoose.model('company', companySchema);