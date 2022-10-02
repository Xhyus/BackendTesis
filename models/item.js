const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxLenght: 250
    },
});
module.exports = mongoose.model('Item', itemSchema);