let AttendanceModel = require('../models/attendance')
let UserModel = require('../models/user')
const moment = require('moment')

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

        console.log( item ); 
        //res.render('pages/user/show', { item });
        if(item == null){
            let attendanceModel = new AttendanceModel({
                //id : data.User.id, 
                user_id : id, 
                name: name, 
                latitude : latitude,
                longitude : longitude, 
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
                name:"Anujue", 
                latitude : 16.123456789,
                longitude : 96.123456789 
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
    });



    res.status(201).json("OK" + name );

}

exports.update = async (req, res, next) => {
    var id = req.params.id; 
    res.status(201).json("OK" + id );
    // req.body is for POST requests. Think 'body of the postman'
    // destruct the name value from the request body
    const {name} = req.body;
    return name; 

    // check if database already contains this name
    const foundUser = await UserModel.find({name});

    // if no user is found, we can add this user to the database.
    if(!foundUser || foundUser.length == 0) {
        const user = new UserModel({name});
        const response = await user.save();
        res.status(201).json(response);
    } else {
        res.status(409).json({message: "User already exists!"});
    }
}