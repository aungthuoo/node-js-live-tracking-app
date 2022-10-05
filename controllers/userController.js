let UserModel = require("../models/user");
const moment = require('moment-timezone')

exports.users = (req, res, next) => {
    console.log(req.body);
    return "users";
}


exports.update = async (item) => {
    var _id = item.id ?? 0; 
    var name = item.username ?? ""; 
    var orderCount = item.order_count ?? 0; 
    var latitude = item.latitude ?? 0.0; 
    var longitude = item.longitude ?? 0.0; 



    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Yangon'
    });



    var query = {id : _id},
    update = { 
        name : name, 
        id : _id, 
        latitude : latitude, 
        longitude : longitude, 
        order_count : orderCount, 
        updated_at :  moment().tz("Asia/Rangoon").format()
        //updated_at: new Date()
        //expire: new Date() 
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    UserModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        // do something with the document
    });

}


exports.updateUser = async (req, res, next) => {
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

        console.log( item ); 
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
    res.status(201).json("OK" + name );
}