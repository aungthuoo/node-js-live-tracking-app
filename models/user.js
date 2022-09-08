let mongoose = require('mongoose')
let validator = require('validator')

let emailSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        // validate: (value) => {
        //   return validator.isEmail(value)
        // }
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

module.exports = mongoose.model('User', emailSchema)