let UserModel = require("../models/user");
let AttendanceModel = require("../models/attendance");
const moment = require('moment')
const helper = require("../helpers.js");


exports.assign = async (req, res, next) => {
    var userId = 0 ; 
    var distance = 0.00; 
    var rejectedUsers = req.body.rejected_users ?? []; 
    var restaurantLatitude = req.body.latitude ?? 0.0; 
    var restaurantLongitude = req.body.longitude ?? 0.0; 
    var result = [];
    console.log(rejectedUsers);


    const today = moment().startOf('day')
    var query = {
        /*
        "updated_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        */
        'user_id': {$nin : rejectedUsers}
    };


    const users = await AttendanceModel
                    .find(query)
                    .sort({ updated_at: 'descending' })
                    .limit(100);
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

    if(users.length > 0 ){
        userId = users[0].user_id
    }

    res.status(200).json( { "status" : true, "user_id" : userId, "users" : users });

}



exports.timeDiff = async (req, res, next) => {
    /*
    var date1 = new Date();
    var date2 = new Date(2015, 2, 2);
    var diff = new Date(date2.getTime() - date1.getTime());

    var years = diff.getUTCFullYear() - 1970; // Gives difference as year
    var months = diff.getUTCMonth(); // Gives month count of difference
    var days = diff.getUTCDate()-1; // Gives day count of difference

    //alert("remaining time = " + years + " years, " + months + " months, " + days + " days.");
    var result = "remaining time = " + years + " years, " + months + " months, " + days + " days."; 
*/




/*
    var date1 = new Date();
    var date2 = new Date(2022, 10, 1, 10, 00, 00);
    var diff = new Date(date2.getTime() - date1.getTime());

    var years = diff.getUTCFullYear() - 1970; // Gives difference as year
    var months = diff.getUTCMonth(); // Gives month count of difference
    var days = diff.getUTCDate()-1; // Gives day count of difference

    //alert("remaining time = " + years + " years, " + months + " months, " + days + " days.");
    var result = "remaining time = " + years + " years, " + months + " months, " + days + " days."; 
*/

var countDownDate = new Date("2022-10-01 16:37:52").getTime();
var now = new Date().getTime();
var timeleft = countDownDate - now;
    
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    res.status(200).json( { "status" : true, data : days });

}

