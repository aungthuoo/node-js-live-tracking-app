let mongoose = require('mongoose')
let validator = require('validator')

let attendanceSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        lowercase: true,
    },
    // user_id: {
    //     type: Number,
    //     required: true,
    //     lowercase: true,
    // },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    //     // validate: (value) => {
    //     //   return validator.isEmail(value)
    //     // }
    // },
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
    },
    updated_at: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Attendance', attendanceSchema)