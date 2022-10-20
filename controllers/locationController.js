/*
exports.update = (req, res, next) => {
    console.log(req.body);
    


    let locationModel = new LocationModel({
        //id : data.User.id, 
        user_id : data.id, 
        name: data.username, 
        latitude : data.latitude,
        longitude : data.longitude, 
        created_at : new Date()
    }); 
    locationModel.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
    return "update";
}
*/
/*
exports.update = async (req, res, next) => {
    // req.body is for POST requests. Think 'body of the postman'
    // destruct the name value from the request body
    const {name} = req.body;

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
*/
let LocationModel = require("../models/location");

exports.update = async (item) => {
    let locationModel = new LocationModel({

        //id : data.User.id,
        user_id: item.id,
        name: item.username,
        latitude: item.latitude,
        longitude: item.longitude,
        created_at: new Date(),
        updated_at: new Date()
      });
      locationModel
        .save()
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.error(err);
        });
  
}

exports.save = async (req, res, next) => {
    
    res.status(201).json("OK");
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
