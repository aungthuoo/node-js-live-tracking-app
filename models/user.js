let mongoose = require('mongoose')
// <<<<<<< HEAD
// // Database Connection
// mongoose.connect('mongodb://127.0.0.1:27017/live_tracking',{
//     useNewUrlParser: true,
//     //useCreateIndex: true,
//     useUnifiedTopology: true
// });
// =======
// >>>>>>> live_track

mongoose.set('debug', true);
let validator = require('validator')

let userSchema = new mongoose.Schema({
    id: {
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
    
})

module.exports = mongoose.model('User', userSchema)