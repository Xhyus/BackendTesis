const mongoose = require('mongoose');
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
    updated: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        default: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000)
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('quote', QuoteSchema);