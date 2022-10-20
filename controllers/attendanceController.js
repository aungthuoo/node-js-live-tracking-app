let AttendanceModel = require('../models/attendance')
let WorkingHourInterval = require('../models/workingHourInterval')
let UserModel = require('../models/user')
let TodayShiftInfo = require('../models/todayShiftInfo')
const moment = require('moment')
const helper = require("../helpers.js");
const axios = require('axios')

exports.index = async (req, res, next) => {
    //var id = req.params.id; 
   
    AttendanceModel.find({}, (err, items) => {
        if (err) console.error(err);
        console.log('maps find') ; 
        res.render("pages/attendance/index", {
            root: __dirname,
            id : 123456,
            items : items 
        });
    });
}



exports.active = async (req, res, next) => {
    //var id = req.params.id; 
   
    const today = moment().startOf('day')
    var query = {
        "updated_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    };
    UserModel.find(query, (err, items) => {
        if (err) console.error(err);
        console.log('maps find') ; 
        // res.render("pages/attendance/index", {
        //     root: __dirname,
        //     id : 123456,
        //     items : items 
        // });
        res.status(200).json( items );
    }).sort({ order_count: 'ascending' });

    //res.status(201).json( result );
}




exports.save = async (req, res, next) => {
    var id = req.body.id ?? 0; 
    var name = req.body.name ?? ""; 
    var latitude = req.body.latitude ?? 0.0; 
    var longitude = req.body.longitude ?? 0.0; 


    const today = moment().startOf('day')


    AttendanceModel.findOne({ 
            "user_id": id, 
            "created_at": {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
              }
         }, (err, item) => {
        if (err) console.error(err);

        //console.log( item ); 
        //res.render('pages/user/show', { item });
        if(item == null){
            let attendanceModel = new AttendanceModel({
                //id : data.User.id, 
                user_id : id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
                duty_in_at : helper.utcDate(new Date()),
                duty_out_at : helper.utcDate(new Date()), 
                created_at : helper.utcDate(new Date()),
                updated_at : helper.utcDate(new Date())
            }); 
            attendanceModel.save()
                .then(doc => {
                    //console.log(doc)
                })
                .catch(err => {
                    console.error(err)
                })
        }else{
            const filter = { _id: item._id };
            const update = { 
                name: name, 
                latitude : latitude,
                longitude : longitude,
                duty_out_at : helper.utcDate(new Date()), 
            };

            AttendanceModel.findOneAndUpdate(filter, update, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    //console.log("Original Doc : ",docs);
                }
            });
        }
        //helper.echo("abc");
    });



    res.status(201).json("OK" + name );

}


exports.update = async (req, res, next) => {

    var _id = req.id ?? 0; 
    var name = req.username ?? ""; 
    var latitude = req.latitude ?? 0.0; 
    var longitude = req.longitude ?? 0.0; 


    //   var utcDate = helper.getDateFromStringTime(new Date(), '03', "59", "01")
    //   res.status(200).json( { "status" : true, "date2" : utcDate });


/*
    var _id = req.body.id ?? 0; 
    var name = req.body.username ?? ""; 
    var latitude = req.body.latitude ?? 0.0; 
    var longitude = req.body.longitude ?? 0.0; 
*/
    const today = moment().startOf('day')
    var query = { 
        "user_id": _id, 
        "created_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }; 

    AttendanceModel.exists(query, async function (err, doc)  {
        if (err) console.error(err);
        if (doc){
            const update = { 
                duty_out_at : helper.utcDate(new Date()), 
                updated_at : helper.utcDate(new Date())
            };
            AttendanceModel.findOneAndUpdate(query, update, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    //console.log("Original Doc : ",docs);
                }
            });
            res.status(200).json( { "status" : true });
        }else{
            axios
                .get('https://api.foodmallmm.com/api/v2/biker-app/booking-info', { params: { user_id: _id } })
                .then(async response => {
                //this.users = response.data; 
                    console.log( response.data ); 
                    shifts = response.data.data; 
        
                    if( shifts.length > 0 ) {
                        shiftStartAt = shifts[0].start_time.split(":");
                        shiftEndAt = shifts[shifts.length - 1].end_time.split(":");


                        
                        let attendanceModel = new AttendanceModel({
                            id : _id, 
                            user_id : _id, 
                            name: name, 
                            latitude : latitude,
                            longitude : longitude, 
                        
                            shift_start_at: helper.getDateFromStringTime(new Date(), shiftStartAt[0], shiftStartAt[1], shiftStartAt[2]),
                            shift_end_at: helper.getDateFromStringTime(new Date(), shiftEndAt[0], shiftEndAt[1], shiftEndAt[2]),

                            duty_in_at : helper.utcDate(new Date()),
                            duty_out_at : helper.utcDate(new Date()), 

                            created_at : helper.utcDate(new Date()),
                            updated_at : helper.utcDate(new Date())
                        }); 
                        await attendanceModel.save()
                            .then(doc => {
                                //console.log(doc)
                            })
                            .catch(err => {
                                console.error(err)
                            })
                            res.status(200).json( { "status" : true, "att" : attendanceModel,  "shift_start" : shiftStartAt, "shift_end": shiftEndAt });
                    
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)

        }
    });


}



exports.updateWorkingHourInterval = async (data) => {
    /*
        var _id = req.id ?? 0; 
        var name = req.username ?? ""; 
        var inShift = req.in_shift ?? 1; 
        //res.status(201).json("OK" + name  );
    */
   
        var _id = data.user_id ?? 0; 
        var name = data.username ?? ""; 
        var inShiftStatus = data.in_shift ?? 1; 
        console.log( "user name is : " ); 
        console.log( name ); 

    
        const today = moment().startOf('day')
        var query = { 
            "user_id": _id, 
            "created_at": {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        }; 
    
    
        WorkingHourInterval.exists(query, async function (err, doc)  {

            if (err) console.error(err);
            if (doc){

 
                const update = { 
                    //_field : 1, 
                    updated_at : helper.utcDate(new Date())
                };
                WorkingHourInterval.findOneAndUpdate(query, update, null, function (err, docs) {
                    if (err){
                        console.log(err)
                    }else{
                         
                        var hourColumn, minColumn = ""; 

                        hourColumn = new Date().getHours();
                        var minutes = new Date().getMinutes();


                        
                        if( minutes >= 50){
                            minColumn = "_60"; 
                        }else if( minutes >= 40){
                            minColumn = "_50"; 
                        }else if( minutes >= 30){
                            minColumn = "_40"; 
                        }else if( minutes >= 20){
                            minColumn = "_30";
                        }else if( minutes >= 10){
                            minColumn = "_20";  
                        }else if( minutes >= 0){
                            minColumn = "_10";  
                        }

                        var column = "t" + hourColumn + minColumn; 
                        var query = {
                            "user_id" : _id,
                            "created_at": {
                                $gte: today.toDate(),
                                $lte: moment(today).endOf('day').toDate()
                            }
                        }; 

                        
                        var setQuery = {};
                        let statusColumn = `working_hours.${column}.status`;
                        let inShiftColumn = `working_hours.${column}.in_shift`
                        setQuery[statusColumn] = 1; 
                        setQuery[inShiftColumn] = inShiftStatus; 
                        
                        //res.status(200).json( setQuery );

                        WorkingHourInterval.findOneAndUpdate(query, {$set: setQuery }, function(err, doc) {
                            console.log(doc);
                            
                        });

                    }
                });
            }else {
                let workingHourInterval = new WorkingHourInterval({
                    id : _id, 
                    user_id : _id, 
                    name: name, 
                    //_field : 1, 
                    //cards : [], 
                    created_at : helper.utcDate(new Date()),
                    updated_at : helper.utcDate(new Date())
                }); 
                //res.status(200).json( { "status" : workingHourInterval });
                workingHourInterval.save()
                    .then(doc => {
                        //console.log(doc)
    
    
                        var workingHours = {
                            "t6_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t6_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t6_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t6_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t6_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t6_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                        // 7:00 
                            "t7_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t7_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t7_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t7_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t7_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t7_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                        
                            // 8:00 
                            "t8_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t8_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t8_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t8_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t8_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t8_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                        // 9:00 
                            "t9_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t9_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t9_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t9_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t9_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t9_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                        // 10:00 
                            "t10_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t10_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t10_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t10_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t10_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t10_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },

                        // 11:00 
                            "t11_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t11_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t11_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t11_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t11_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t11_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },


                        // 12:00 
                            "t12_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t12_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t12_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t12_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t12_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t12_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },


                        // 13:00 
                            "t13_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t13_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t13_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t13_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t13_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t13_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },

                        // 14:00 
                            "t14_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t14_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t14_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t14_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t14_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t14_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            
                        // 15:00 
                            "t15_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 15:00 
                            "t15_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t15_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },


                        // 16:00 
                            "t16_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t16_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t16_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t16_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t16_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t16_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },


                        // 17:00 
                            "t17_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t17_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t17_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t17_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t17_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t17_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 18:00 
                            "t18_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t18_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t18_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t18_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t18_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t18_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },




                        // 19:00 
                            "t19_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t19_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t19_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t19_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t19_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t19_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 20:00 
                            "t20_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t20_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t20_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t20_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t20_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t20_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 21:00 
                            "t21_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t21_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t21_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t21_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t21_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t21_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 22:00 
                            "t22_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t22_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t22_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t22_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t22_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t22_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },



                        // 23:00 
                            "t23_10" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t23_20" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t23_30" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t23_40" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t23_50" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                            "t23_60" :  {
                                caption : "",
                                status : 0, 
                                hold_count : 0,
                                in_shift : 0
                            },
                        }; 
    
    
                        //res.status(200).json( { "status" : "model", "id": doc._id  });
    
                        WorkingHourInterval.findByIdAndUpdate(doc._id,
                            {$set:{working_hours:  workingHours }},
                            function (err, managerparent) {
                                if (err) throw err;
                                console.log(managerparent);
                                //res.status(200).json( { "status" : "model", "id": doc._id  });
                                return true; 
                            }
                        );
    
    
                        
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
            
        });
    }
    

exports.showTestRecord = async (req, res, next) => {

    var _id = req.body._id; 
    //res.status(200).json( _id );

    var query = {
        id : _id
    }; 

    // var query = { 
    //     "created_at": {
    //         $gte: today.toDate(),
    //         $lte: moment(today).endOf('day').toDate()
    //     }
    // }; 

    WorkingHourInterval.find(query, (err, item) => {
        if (err) console.error(err);
        
        res.status(200).json( item );
    }).sort({ name: 'ascending' });

    
}


exports.updateTestRecord = async (req, res, next) => {

    var _id = req.body._id; 
    var hourColumn, minColumn = ""; 
    
    hourColumn = new Date().getHours();
    var minutes = new Date().getMinutes();


    
    if( minutes >= 50){
        minColumn = "_60"; 
    }else if( minutes >= 40){
        minColumn = "_50"; 
    }else if( minutes >= 30){
        minColumn = "_40"; 
    }else if( minutes >= 20){
        minColumn = "_30";
    }else if( minutes >= 10){
        minColumn = "_20";  
    }else if( minutes >= 0){
        minColumn = "_10";  
    }

    var result = "t" + hourColumn + minColumn; 
    var query = {
        id : _id
    }; 

    
    var setQuery = {};
    let str = `working_hours.${result}.status`
    setQuery[str] = 1; 
    //res.status(200).json( str );
    //res.status(200).json( setQuery );

    WorkingHourInterval.findOneAndUpdate(query, {$set: setQuery }, function(err, doc) {
        console.log(doc);
        //res.status(200).json( _id );

        var query = {
            id : _id
        }; 
        WorkingHourInterval.find(query, (err, item) => {
            if (err) console.error(err);
            
            res.status(200).json( item );
        }).sort({ name: 'ascending' });

        
    });
}



exports.workingHour = async (req, res, next) => {

    var _id = req.body.user_id; 
    var query = {
        id : _id,
    }; 


    WorkingHourInterval.findOne(query)
    .populate({ path: "working_hours"})
    .exec(function(err, item) {
        let totalWorkingHours = item.working_hours.t6_10.status + 
                    item.working_hours.t6_20.status + 
                    item.working_hours.t6_30.status + 
                    item.working_hours.t6_40.status + 
                    item.working_hours.t6_50.status + 
                    item.working_hours.t6_60.status +
                    
                    item.working_hours.t7_10.status + 
                    item.working_hours.t7_20.status + 
                    item.working_hours.t7_30.status + 
                    item.working_hours.t7_40.status + 
                    item.working_hours.t7_50.status + 
                    item.working_hours.t7_60.status +

                    item.working_hours.t8_10.status + 
                    item.working_hours.t8_20.status + 
                    item.working_hours.t8_30.status + 
                    item.working_hours.t8_40.status + 
                    item.working_hours.t8_50.status + 
                    item.working_hours.t8_60.status +

                    item.working_hours.t9_10.status + 
                    item.working_hours.t9_20.status + 
                    item.working_hours.t9_30.status + 
                    item.working_hours.t9_40.status + 
                    item.working_hours.t9_50.status + 
                    item.working_hours.t9_60.status +

                    item.working_hours.t10_10.status + 
                    item.working_hours.t10_20.status + 
                    item.working_hours.t10_30.status + 
                    item.working_hours.t10_40.status + 
                    item.working_hours.t10_50.status + 
                    item.working_hours.t10_60.status +

                    item.working_hours.t11_10.status + 
                    item.working_hours.t11_20.status + 
                    item.working_hours.t11_30.status + 
                    item.working_hours.t11_40.status + 
                    item.working_hours.t11_50.status + 
                    item.working_hours.t11_60.status +

                    item.working_hours.t12_10.status + 
                    item.working_hours.t12_20.status + 
                    item.working_hours.t12_30.status + 
                    item.working_hours.t12_40.status + 
                    item.working_hours.t12_50.status + 
                    item.working_hours.t12_60.status +

                    item.working_hours.t13_10.status + 
                    item.working_hours.t13_20.status + 
                    item.working_hours.t13_30.status + 
                    item.working_hours.t13_40.status + 
                    item.working_hours.t13_50.status + 
                    item.working_hours.t13_60.status +

                    item.working_hours.t14_10.status + 
                    item.working_hours.t14_20.status + 
                    item.working_hours.t14_30.status + 
                    item.working_hours.t14_40.status + 
                    item.working_hours.t14_50.status + 
                    item.working_hours.t14_60.status +

                    item.working_hours.t15_10.status + 
                    item.working_hours.t15_20.status + 
                    item.working_hours.t15_30.status + 
                    item.working_hours.t15_40.status + 
                    item.working_hours.t15_50.status + 
                    item.working_hours.t15_60.status +

                    item.working_hours.t16_10.status + 
                    item.working_hours.t16_20.status + 
                    item.working_hours.t16_30.status + 
                    item.working_hours.t16_40.status + 
                    item.working_hours.t16_50.status + 
                    item.working_hours.t16_60.status +

                    item.working_hours.t17_10.status + 
                    item.working_hours.t17_20.status + 
                    item.working_hours.t17_30.status + 
                    item.working_hours.t17_40.status + 
                    item.working_hours.t17_50.status + 
                    item.working_hours.t17_60.status +

                    item.working_hours.t18_10.status + 
                    item.working_hours.t18_20.status + 
                    item.working_hours.t18_30.status + 
                    item.working_hours.t18_40.status + 
                    item.working_hours.t18_50.status + 
                    item.working_hours.t18_60.status +

                    item.working_hours.t19_10.status + 
                    item.working_hours.t19_20.status + 
                    item.working_hours.t19_30.status + 
                    item.working_hours.t19_40.status + 
                    item.working_hours.t19_50.status + 
                    item.working_hours.t19_60.status +

                    item.working_hours.t20_10.status + 
                    item.working_hours.t20_20.status + 
                    item.working_hours.t20_30.status + 
                    item.working_hours.t20_40.status + 
                    item.working_hours.t20_50.status + 
                    item.working_hours.t20_60.status +

                    item.working_hours.t21_10.status + 
                    item.working_hours.t21_20.status + 
                    item.working_hours.t21_30.status + 
                    item.working_hours.t21_40.status + 
                    item.working_hours.t21_50.status + 
                    item.working_hours.t21_60.status +

                    item.working_hours.t22_10.status + 
                    item.working_hours.t22_20.status + 
                    item.working_hours.t22_30.status + 
                    item.working_hours.t22_40.status + 
                    item.working_hours.t22_50.status + 
                    item.working_hours.t22_60.status +

                    item.working_hours.t23_10.status + 
                    item.working_hours.t23_20.status + 
                    item.working_hours.t23_30.status + 
                    item.working_hours.t23_40.status + 
                    item.working_hours.t23_50.status + 
                    item.working_hours.t23_60.status ;

        res.status(200).json( { 
            "status" : true, 
            "user_id" : _id,  
            "total_working_hours" : totalWorkingHours * 10,
            "shift_working_hours" : totalWorkingHours * 10
        });
    });




    // WorkingHourInterval.count(query, function(err, result) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.json("Number of documents in the collection: " + result);
    //     }
    // });

}


exports.todayShiftInfo = async (req, res, next) => {
    var userId = req.body.user_id; 


    
    var query = { 
        "user_id": userId
    }; 

    const today = moment().startOf('day')
    TodayShiftInfo.exists(query, async function (err, doc)  {
        if (err) console.error(err);


        const update = { 
            shift_start_at : helper.utcDate(new Date()), 
            shift_end_at : helper.utcDate(new Date())
        };

        if (doc){
            TodayShiftInfo.update(query, update, function (err, docs) {
                if (err){
                    console.log(err)
                }else{
                    //console.log("Original Doc : ",docs);
                }
            });
            res.status(200).json( { "status" : true });

        }else {
            let todayShiftInfoModel = new TodayShiftInfo({
                //id : data.User.id, 
                user_id : userId, 
                name: "name", 
                shift_start_at : helper.utcDate(new Date()), 
                shift_end_at : helper.utcDate(new Date()),
                created_at : helper.utcDate(new Date()),
                updated_at : helper.utcDate(new Date())
            }); 
            todayShiftInfoModel.save()
                .then(doc => {
                    //console.log(doc)
                    res.status(200).json( { "status" : true });
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }); 
 
}




exports.updateInShift = async (req, res, next) => {

    //var _id = req.body._id; 
    var _id = req._id;
    var hourColumn, minColumn = ""; 

    hourColumn = new Date().getHours();
    var minutes = new Date().getMinutes();


    
    if( minutes >= 50){
        minColumn = "_60"; 
    }else if( minutes >= 40){
        minColumn = "_50"; 
    }else if( minutes >= 30){
        minColumn = "_40"; 
    }else if( minutes >= 20){
        minColumn = "_30";
    }else if( minutes >= 10){
        minColumn = "_20";  
    }else if( minutes >= 0){
        minColumn = "_10";  
    }

    var result = "t" + hourColumn + minColumn; 
    var query = {
        id : _id
    }; 

    
    var setQuery = {};
    let str = `working_hours.${result}.status`
    setQuery[str] = 1; 
    
    //res.status(200).json( setQuery );

    WorkingHourInterval.findOneAndUpdate(query, {$set: setQuery }, function(err, doc) {
        console.log(doc);
        //res.status(200).json( _id );

        var query = {
            id : _id
        }; 
        WorkingHourInterval.find(query, (err, item) => {
            if (err) console.error(err);
            
            res.status(200).json( item );
        }).sort({ name: 'ascending' });

        
    });
}

