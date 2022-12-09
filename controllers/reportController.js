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


        var dutyInAt, dutyOutAt; 



        result = items.map(function(doc) { 
            // var duration = moment.duration(doc.shift_start_at.diff(doc.duty_in_at))
            // var hours = duration.hours();
            // doc.in_diff = hours

            // var duration = moment.duration(doc.duty_in_at.diff(doc.duty_out_at));
            // var hours = duration.asHours();

            shiftStartAt =  moment(doc.shift_start_at) ?? moment([2019, 03, 17]); 
            dutyInAt = moment(doc.duty_in_at) ?? moment([2019, 03, 17]); 

            var result = shiftStartAt.diff( dutyInAt, 'minutes') 

            doc.out_diff = result
            return doc; 
        });

        res.render("pages/reports/daily_attendance", {
            root: __dirname,
            id : 123456,
            items : result,
            moment : moment(),
            searchFor: searchFor 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' });
}




exports.workingHour = async (req, res, next) => {
    debugger; 

    let searchFor = req.query.date; 
    
    // let today = moment().startOf('day')
    // res.status(200).json( { "status" : today });
    // if(searchFor)
    //     today = moment(searchFor, 'YYYY-MM-DD').startOf('day');


    //var tranDateId =  helper.getTranDateId( today  ); 


    //let parsed = moment(searchFor, "YYYY-MM-DD"); 
    //var tranDateId =  helper.getTranDateId( parsed  ); 



    var parsed = new Date(searchFor );
    var tranDateId =  helper.getTranDateId( parsed  ); 
    //res.status(200).json( { "status" : tranDateId });



    var query = { 
        "tran_date_id" : tranDateId  
    };
    WorkingHourInterval.find(query, (err, items) => {
        debugger; 
        if (err) console.error(err);
        //console.log( items); 
        //res.status(200).json( items );
    
        res.render("pages/reports/working_hour", {
            root: __dirname,
            id : 123456,
            items : items,
            query : query, 
            searchFor : searchFor 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' })
    .limit(100);

}


exports.workHour = async (req, res, next) => {
    debugger; 

    let searchFor = req.query.date; 
    
    var parsed = new Date(searchFor );
    var tranDateId =  helper.getTranDateId( parsed  ); 



    var query = { 
        "tran_date_id" : tranDateId  
    };
    WorkingHourInterval.find(query, (err, items) => {
        debugger; 
        if (err) console.error(err);
        //console.log( items); 
        //res.status(200).json( items );
    
        res.render("pages/reports/working_hour", {
            root: __dirname,
            id : 123456,
            items : items,
            query : query, 
            searchFor : searchFor 
        });
        //res.status(200).json( items );
    }).sort({ name: 'ascending' })
    .limit(100);

}


