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
                duty_in_at : new Date(),
                duty_out_at : new Date(), 
                created_at : new Date(),
                updated_at : new Date()
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
                duty_out_at : new Date(), 
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
                duty_out_at : new Date(), 
                updated_at : new Date()
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
            let attendanceModel = new AttendanceModel({
                id : _id, 
                user_id : _id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
                duty_in_at : new Date(),
                duty_out_at : new Date(), 
                created_at : new Date(),
                updated_at : new Date()
            }); 
            await attendanceModel.save()
                .then(doc => {
                    //console.log(doc)
                })
                .catch(err => {
                    console.error(err)
                })
                
        }
    });


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
