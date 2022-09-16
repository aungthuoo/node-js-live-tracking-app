let mongoose = require('mongoose')
let validator = require('validator')

let testSchema = new mongoose.Schema({
    id: {
        type: Number,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        //lowercase: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    
})

module.exports = mongoose.model('Test', testSchema)