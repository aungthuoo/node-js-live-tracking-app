let AttendanceModel = require('../models/attendance')
let WorkingHourInterval = require('../models/workingHourInterval')
let UserModel = require('../models/user')
const moment = require('moment')
const helper = require("../helpers.js");
const axios = require('axios')




exports.reportDashboard = async (req, res, next) => {
    //res.status(200).json( "here" );
    // var _id = req.id ?? 0; 
    // var name = req.username ?? ""; 
    // var latitude = req.latitude ?? 0.0; 
    // var longitude = req.longitude ?? 0.0; 


    res.render("pages/reports/index", {
        root: __dirname,
        id : 123456,
    });
}



exports.dailyAttendance = async (req, res, next) => {
    let searchFor = req.query.date; 
    let today = moment().startOf('day')

    if(searchFor)
        today = moment(searchFor, 'DD-MM-YYYY').startOf('day');

        
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
            items : items,
            searchFor: searchFor 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' });
}




exports.workingHour = async (req, res, next) => {
    let searchFor = req.query.date; 
    let today = moment().startOf('day')

    if(searchFor)
        today = moment(searchFor, 'DD-MM-YYYY').startOf('day');


    var query = { 
        "created_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }; 
    WorkingHourInterval.find(query, (err, items) => {
        if (err) console.error(err);
        console.log( items); 
        res.render("pages/reports/working_hour", {
            root: __dirname,
            id : 123456,
            items : items,
            searchFor : searchFor 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' });

}


