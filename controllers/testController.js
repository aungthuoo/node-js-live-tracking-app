let UserModel = require("../models/user");
const moment = require('moment-timezone')
const helper = require("../helpers.js");

exports.datetime = async (req, res, next) => {


    var _id = 25924; 
    var query = {id : _id},
    update = { 
        name : helper.utcDate(new Date()), 
        id : _id, 
        latitude : 16.1001, 
        longitude : 96.1001, 
        order_count : 38, 
        active_at : helper.utcDate(new Date()), 
        updated_at :   helper.utcDate(new Date()), 
        //expire: new Date() 
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    UserModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        // do something with the document
    });

    var query = {
        'id': _id
    };
    const users = await UserModel
                    .find(query)
                    .sort({ updated_at: 'descending' })
                    .limit(50);




    res.status(200).json( { "status" : true, "updatedAt" : new Date(), "users" : users });

}

