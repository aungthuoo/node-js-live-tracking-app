let mongoose = require('mongoose')
let validator = require('validator')

let attendanceSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        //lowercase: true,
    },
    // user_id: {
    //     type: Number,
    //     required: true,
    //     lowercase: true,
    // },
    name: {
        type: String,
        required: true,
        //lowercase: true,
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
    distance_km: {
        type: Number,
        //required: true
    },

    shift_start_at: {
        type: Date,
        required: true
    },
    shift_end_at: {
        type: Date,
        required: true
    },


    duty_in_at: {
        type: Date,
        required: true
    },
    duty_out_at: {
        type: Date,
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