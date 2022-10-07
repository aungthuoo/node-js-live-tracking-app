let AttendanceModel = require('../models/attendance')
let UserModel = require('../models/user')
const moment = require('moment')
const helper = require("../helpers.js");


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


            let attendanceModel = new AttendanceModel({
                id : _id, 
                user_id : _id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
            
                shift_start_at: helper.utcDate(new Date()),
                shift_end_at: helper.utcDate(new Date()), 

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

    /*



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

*/
                
        }
    });


    async function createUserAttendance(shiftStartAt, shiftEndAt) {
        //FIXME: Food Mall Api 
        //var shiftStartAt = helper.utcDate(new Date()); 
        //var shiftEndAt = helper.utcDate(new Date()); 
        

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

/*






    update = { 
        id : _id, 
        user_id : _id, 
        name: name, 
        latitude : latitude,
        longitude : longitude, 
        duty_in_at : new Date(),
        duty_out_at : new Date(), 
        created_at : new Date(),
        updated_at : new Date()
    },

    AttendanceModel.findOne({ 
        query, 
     }, (err, item) => {
        if (err) console.error(err);

        console.log( item ); 
        //res.render('pages/user/show', { item });
        if(item){
            let attendanceModel = new AttendanceModel({
                //id : data.User.id, 
                user_id : _id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
                duty_in_at : new Date(),
                duty_out_at : new Date(), 
                created_at : new Date(),
                updated_at : new Date()
            }); 
            attendanceModel.save()
                .then(doc => {
                    console.log(doc)
                })
                .catch(err => {
                    console.error(err)
                })
        }else{
            const filter = { 
                "user_id": _id, 
                "created_at": {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                } 
            };
            const update = { 
                name: name, 
                latitude : latitude,
                longitude : longitude,
                duty_out_at : new Date(), 
                updated_at : new Date(), 
            };

            AttendanceModel.findOneAndUpdate(filter, update, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Original Doc : ",docs);
                }
            });
        }
        //helper.echo("abc");
    });
*/



/*
    var query = {user_id : _id},
    update = { 
        id : _id, 
        user_id : _id, 
        name: name, 
        latitude : latitude,
        longitude : longitude, 
        duty_in_at : new Date(),
        duty_out_at : new Date(), 
        created_at : new Date(),
        updated_at : new Date()
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    AttendanceModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        // do something with the document
    });
*/



/*
    AttendanceModel.findOne({ 
            "user_id": id, 
            "created_at": {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
              }
         }, (err, item) => {
        if (err) console.error(err);

        console.log( item ); 
        //res.render('pages/user/show', { item });
        if(item == null){
            let attendanceModel = new AttendanceModel({
                id : id, 
                user_id : id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
                duty_in_at : new Date(),
                duty_out_at : new Date(), 
                created_at : new Date(),
                updated_at : new Date()
            }); 
            attendanceModel.save()
                .then(doc => {
                    console.log(doc)
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
                duty_out_at : new Date(), 
            };

            AttendanceModel.findOneAndUpdate(filter, update, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Original Doc : ",docs);
                }
            });
        }
        //helper.echo("abc");
    });



    //res.status(201).json("OK" + name );
*/
}
