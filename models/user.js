let mongoose = require('mongoose')
let validator = require('validator')
//https://stackoverflow.com/questions/35672248/how-to-change-date-timezone-in-mongoose
//const moment = require('moment-timezone');

var current = new Date();
const timeStamp = new Date(Date.UTC(
    current.getFullYear(), 
    current.getMonth(),current.getDate(),
    current.getHours(), 
    current.getMinutes(),
    current.getSeconds(), 
    current.getMilliseconds()));




let userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
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
    order_count: {
        type: Number,
        //required: true
    },
    distance_km: {
        type: Number,
        //required: true
    },
    created_at: {
        type: Date,
        default: timeStamp,
        required: true
    },
    updated_at: {
        type: Date,
        default: timeStamp
    },
    active_at: {
        type: Date,
        default: timeStamp, 
        //required: true
    },
}, { timestamps: true })


// userSchema.pre('update', function(next) {
//     this.updated_at = Date.now();
//     next();
//   });

module.exports = mongoose.model('User', userSchema)