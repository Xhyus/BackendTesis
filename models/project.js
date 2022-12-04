const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quote: {
        type: Schema.Types.ObjectId,
        ref: 'quote'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['En proceso', 'Finalizado', 'No iniciado', 'Pausado'],
        required: true
    },
    currentService: {
        service: {
            type: Schema.Types.ObjectId,
            ref: 'service',
            required: true
        },
        status: {
            type: String,
            enum: ['En proceso', 'Finalizado', 'No iniciado', 'Pausado'],
            required: true
        },
        attachments: [{
            type: String,
            required: true
        }]
    }
})

module.exports = mongoose.model('project', ProjectSchema);