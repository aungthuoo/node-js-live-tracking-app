let mongoose = require('mongoose')
let validator = require('validator')

let todayShiftInfoSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        //lowercase: true,
    },
    name: {
        type: String,
        required: true,
        //lowercase: true,
    },
    shift_start_at: {
        type: Date,
        required: true
    },
    shift_end_at: {
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

module.exports = mongoose.model('TodayShiftInfo', todayShiftInfoSchema)