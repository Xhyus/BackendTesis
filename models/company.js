const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        maxlength: 250
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
        type: Schema.objectId,
        ref: 'contact',
        required: true
    }

})

module.exports = mongoose.model('company', companySchema);