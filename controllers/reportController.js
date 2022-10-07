let AttendanceModel = require('../models/attendance')
let UserModel = require('../models/user')
const moment = require('moment')
const helper = require("../helpers.js");
const axios = require('axios')



exports.dailyAttendance = async (req, res, next) => {
    //res.status(200).json( "here" );
    // var _id = req.id ?? 0; 
    // var name = req.username ?? ""; 
    // var latitude = req.latitude ?? 0.0; 
    // var longitude = req.longitude ?? 0.0; 


    const today = moment().startOf('day')
    var query = { 
        "created_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }; 
    AttendanceModel.find(query, (err, items) => {
        if (err) console.error(err);
        console.log( items); 
        res.render("pages/reports/daily_attendance", {
            root: __dirname,
            id : 123456,
            items : items 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' });
}
