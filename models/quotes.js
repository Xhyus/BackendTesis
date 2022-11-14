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
        services: {
            type: [Schema.Types.ObjectId],
            ref: 'services'
        },
        price: {
            type: Number,
            required: true
        }
    }],
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
})

module.exports = mongoose.model('quote', QuoteSchema);