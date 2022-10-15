const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLenght: 100
    },
    description: {
        type: String,
        required: true,
        maxLenght: 100
    },
    price: {
        type: Number,
        required: true,
    },
    item: {
        type: [Schema.ObjectId],
        ref: 'item',
        maxLenght: 8,
        default: []
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('service', serviceSchema);