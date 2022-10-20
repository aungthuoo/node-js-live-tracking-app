let UserModel = require("../models/user");
const moment = require('moment-timezone')
const helper = require("../helpers.js");
const attendanceController = require('./attendanceController');

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




