const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const signedSchema = new Schema({
    type: {
        type: String,
        enum: ['signed', 'unsigned'],
        default: 'unsigned',
    },
    use: {
        type: String,
        enum: ['recovery', 'company'],
        required: true,
    },
    left: {
        type: Number,
        default: 0,
        limit: 3
    }
});

module.exports = mongoose.model('signed', signedSchema);