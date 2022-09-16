//let mongoose = require('mongoose')
const mongoose = require('mongoose');
  
// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/live_tracking',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.set('debug', true);

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