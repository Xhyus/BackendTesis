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
    itemList: {
        type: [Schema.Types.ObjectId],
        ref: 'Item',
        required: true,
        maxLenght: 8
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

module.exports = mongoose.model('Service', serviceSchema);