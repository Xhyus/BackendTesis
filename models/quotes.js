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
            type: [Schema.Types.ObjectId],
            ref: 'services'
        },
        price: {
            type: Number,
            required: true
        }
    }],
    formalization: {
        type: String,
        enum: ['Firma', 'Notario', 'Otros'],
        required: true
    },
    Payment: {
        type: String,
        enum: ['Efectivo', 'Credito', 'Transferencia', 'Debito', 'Otros'],
        required: true
    },
    PaymentMethod: {
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