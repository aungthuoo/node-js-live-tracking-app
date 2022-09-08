let mongoose = require('mongoose')
let validator = require('validator')

let locationSchema = new mongoose.Schema({
    id: {
        type: Number,
        lowercase: true,
    },
    user_id: {
        type: Number,
        required: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
    
})

module.exports = mongoose.model('Location', locationSchema)