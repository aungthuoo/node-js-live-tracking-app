let AttendanceModel = require('../models/attendance')
let UserModel = require('../models/user')
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
