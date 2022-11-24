let UserModel = require("../models/user");
let WorkingHourInterval = require('../models/workingHourInterval')
const moment = require('moment-timezone')
const helper = require("../helpers.js");
const attendanceController = require('./attendanceController');
const common = require("../common");

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


exports.shiftStartEnd = async (req, res, next) => {
    res.status(200).json( { "status" : true });
    var _id = req.id ?? 0; 
    var name = req.username ?? ""; 
    var latitude = req.latitude ?? 0.0; 
    var longitude = req.longitude ?? 0.0; 
    var shifts = []; 
    var shiftStartTime, shiftEndTime ; 
    

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
        }else{
        //TODO: Call api shift info 

            axios
                .get('https://api.foodmallmm.com/api/v2/biker-app/booking-info', { params: { user_id: _id } })
                .then(response => {
                //this.users = response.data; 
                    console.log( response.data ); 
                    shifts = response.data.data; 
            
                    if( shifts.length > 0 ) {
                        shiftStartAt = shifts[0].start_time;
                        shiftEndAt = shifts[shifts.length - 1].end_time;
            
                        console.log(shifts[0].start_time )




                        //FIXME: Food Mall Api 
                        this.createUserAttendance(shiftStartAt, shiftEndAt) ; 
                            
                    }
                    res.status(200).json( { "status" : true, "shift_start" : shiftStartTime, "shift_end": shiftEndTime });
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)


                
        }
    });
}

async function createUserAttendance(shiftStartAt, shiftEndAt) {
    //FIXME: Food Mall Api 
    var shiftStartAt = helper.utcDate(new Date()); 
    var shiftEndAt = helper.utcDate(new Date()); 
    

    let attendanceModel = new AttendanceModel({
        id : _id, 
        user_id : _id, 
        name: name, 
        latitude : latitude,
        longitude : longitude, 
    
        shift_start_at: shiftStartAt,
        shift_end_at: shiftEndAt,

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

        return true; 
}



exports.inShift = async (req, res, next) => {
        
    var data = {}; 

    data.user_id = 123456; 
    data.username = "User name "; 
    data.in_shift = 1; 
    data.order_count = 0;  

// Working hour log  
    var result = attendanceController.updateWorkingHourInterval( data ); 
    // console.log(result ); 
    // var result = attendanceController.updateInShift( data );

    res.status(200).json( { "status" : result });
}


exports.fixDuplicatedRecord = async (req, res, next) => {
    var userId = req.query.user_id ?? 0; 

    var name = ""; 
    var inShiftStatus =  1; 
    
   
    const today = moment().startOf('day')
    var query = { 
        "user_id": userId, 
        "created_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }; 
    update = {
        //id : userId, 
        user_id : userId, 
        name: "User " + userId, 
        //_field : 1, 
        //cards : [], 
        created_at : helper.utcDate(new Date()),
        updated_at : helper.utcDate(new Date())
    }; 



    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    WorkingHourInterval.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        //res.status(200).json( { "status" : result });


        if( !result.working_hours ){
                
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

            WorkingHourInterval.findByIdAndUpdate(result._id,
                {$set:{working_hours:  workingHours }},
                function (err, managerparent) {
                    if (err) throw err;
                    console.log(managerparent);
                    //res.status(200).json( { "status" : "model", "id": doc._id  });
                    return true; 
                }
            );


        } else {

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
                "user_id" : userId,
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
                res.status(200).json( {status : true} );
            });
        }
        /*
        var query = {
            user_id : result.user_id
        }; 
        WorkingHourInterval.find(query, (err, item) => {
            if (err) console.error(err);
            
            res.status(200).json( item );
        }).sort({ user_id: 'ascending' });
        //res.status(200).json( { "status" : result });
        */
    });
}

exports.saveWorkingHour = async (req, res, next) => {
    //res.status(200).json( "here" );
    
    var userId = req.query.user_id ?? 0;
    //res.status(200).json( "hiere" );
    var data = {}; 
    data.user_id = 74119; 
    data.username = "ato testing"; 
    data.latitude = 16.00;
    data.longitude = 96.00;
    data.total_count = 0; 
    data.hold_count = 0;
    data.in_shift = 1; 
    data.order_count = 0;  
    data.image_name = ""; 

    common.logWorkingHour2(data); 
    res.status(200).json( "here" );
    //return ;
}



exports.getWorkingHours = async (req, res, next) => {
    //res.status(200).json( "here" );
   


    //attendanceController.workingHours(req, res, next ); 
    res.status(200).json( "here" );
    
}




