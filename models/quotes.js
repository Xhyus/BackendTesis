const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const QuoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quoteServices: [{
        service: {
            type: Schema.Types.ObjectId,
            ref: 'service'
        },
        price: {
            type: Number,
            required: true
        }
    }],
    formalization: {
        type: String,
        enum: ['Firma', 'Contrato', 'Confidencialidad'],
        required: true
    },
    payment: {
        type: String,
        enum: ['Efectivo', 'Credito', 'Transferencia', 'Debito', 'Otros'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    documents: {
        type: String,
        enum: ['Exenta', 'Afecta'],
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    projectDelivery: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: function () {
            return crypto.createHash('md5').update(this._id.toString()).digest('hex');
        },
        unique: true
    },
})

module.exports = mongoose.model('quote', QuoteSchema);