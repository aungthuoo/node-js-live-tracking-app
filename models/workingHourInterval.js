let mongoose = require('mongoose')
let validator = require('validator')

let workingHourIntervalSchema = new mongoose.Schema({
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
    // tags: {
    //     type: [
    //       {
    //         type: String,
    //         // Another properties
    //       },
    //     ],
    //     default: ["tech", "economy"],
    // },
    working_hours: {
      type: Object,
      //required: true,
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

module.exports = mongoose.model('WorkingHourInterval', workingHourIntervalSchema)