let mongoose = require('mongoose')
let validator = require('validator')
//https://stackoverflow.com/questions/35672248/how-to-change-date-timezone-in-mongoose
const moment = require('moment-timezone');

const dateRangoon = moment.tz(Date.now(), "Asia/Yangon");
//
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
        default: dateRangoon, 
        required: true
    },
    updated_at: {
        type : Date, default: Date.now
    },
    active_at: {
        type: Date,
        default: Date.now, 
        required: true
    },
})


userSchema.pre('update', function(next) {
    this.updated_at = Date.now();
    next();
  });

module.exports = mongoose.model('User', userSchema)