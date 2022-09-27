let UserModel = require("../models/user");
let AttendanceModel = require("../models/attendance");
const moment = require('moment')
const helper = require("../helpers.js");


exports.assign = async (req, res, next) => {

    var distance = 0.00; 
    var rejectedUsers = req.body.rejected_users ?? []; 
    var restaurantLatitude = req.body.latitude ?? 0.0; 
    var restaurantLongitude = req.body.longitude ?? 0.0; 
    var result = [];
    console.log(rejectedUsers);


    const today = moment().startOf('day')
    var query = {
        "updated_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        'user_id': {$nin : rejectedUsers}
    };


    const users = await AttendanceModel
                    .find(query)
                    .sort({ updated_at: 'descending' })
                    .limit(10);
    if(users.length == 0){
        res.status(200).json( {"status" : false, "message" : "There are no bikers"} );
    }

    for (let i = 0; i < users.length; i++) {
        distance =  helper.distance(restaurantLatitude, restaurantLongitude, users[i].latitude, users[i].longitude, 'K');
        users[i].distance_km = distance; 
    }
    users.sort(function(a, b) {
        return parseFloat(a.distance_km) - parseFloat(b.distance_km);
    });

    res.status(200).json( { "status" : true, "users" : users });

}

