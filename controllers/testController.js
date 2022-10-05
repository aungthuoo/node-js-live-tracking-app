let UserModel = require("../models/user");
const moment = require('moment-timezone')
const dateRangoon = moment.tz(Date.now(), "Asia/Yangon");

exports.datetime = async (req, res, next) => {


    var updatedAt = moment().tz("Asia/Yangon").format()
    //const updatedAt = moment.tz(Date.now(), "Asia/Rangoon");
    // res.status(200).json( { "status" : true, "data" : updatedAt });

    var _id = 25924; 
    var query = {id : _id},
    update = { 
        name : "name123", 
        id : _id, 
        latitude : 16.001, 
        longitude : 96.001, 
        order_count : 31, 
        active_at : moment.utc().toDate(), 
        updated_at :  updatedAt
        //updated_at: new Date()
        //expire: new Date() 
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    UserModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        // do something with the document
    });



    res.status(200).json( { "status" : true, "data" : updatedAt });

}

