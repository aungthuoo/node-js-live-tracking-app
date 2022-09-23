const redis = require("redis");
let AttendanceModel = require("../models/attendance");

const redisSubscriber = redis.createClient();

exports.map = (req, res, next) => {
  redisSubscriber.subscribe("locationUpdateABC");

  res.render("pages/maps", {
    root: __dirname,
    id : 123456,
    users : [] 
  });
  /*
  AttendanceModel.find({}, (err, items) => {
    if (err) console.error(err);
    //res.render("pages/user/index", { items });
    console.log('maps find') ; 
    console.log( items ); 
    res.render("pages/maps", {
      root: __dirname,
      id : 123456,
      users : items 
    });
  });
  */



};
