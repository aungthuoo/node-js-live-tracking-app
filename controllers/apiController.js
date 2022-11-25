let WorkingHourInterval = require("../models/workingHourInterval");
let WorkingHour = require("../models/workingHour");
const moment = require("moment");
const helper = require("../helpers.js");
const axios = require("axios");


exports.workingHours = async (req, res, next) => {
  var dateFrom = req.query.from ?? "";
  var dateTo = req.query.to ?? "";

  from = moment(dateFrom, 'YYYY-MM-DD').startOf('day');
  to = moment(dateTo, 'YYYY-MM-DD').startOf('day');

  //var findDate = 20221115;
  //res.status(200).json( {"data" : from });
  const data = await WorkingHour.aggregate([
    // First Stage
    {
      $match: {
        "createdAt": {
            $gte: helper.utcDate(from.toDate()),
            $lte: helper.utcDate(moment(to).endOf('day').toDate())
        }
        //tran_date_id: { $eq: findDate },
      },
    },
    // Second Stage
    {
      $group: {
        _id: "$user_id",
        user_id: {
          $sum: "$user_id",
        },
        working_days: { $sum: 1 },

        total_working_minutes: {
          $sum: {
            $add: [
              //"$t14_30_status",
              //"$t14_40_status"
              "$t6_10_status",
              "$t6_20_status",
              "$t6_30_status",
              "$t6_40_status",
              "$t6_50_status",
              "$t6_60_status",

              "$t7_10_status",
              "$t7_20_status",
              "$t7_30_status",
              "$t7_40_status",
              "$t7_50_status",
              "$t7_60_status",

              "$t8_10_status",
              "$t8_20_status",
              "$t8_30_status",
              "$t8_40_status",
              "$t8_50_status",
              "$t8_60_status",

              "$t9_10_status",
              "$t9_20_status",
              "$t9_30_status",
              "$t9_40_status",
              "$t9_50_status",
              "$t9_60_status",

              "$t10_10_status",
              "$t10_20_status",
              "$t10_30_status",
              "$t10_40_status",
              "$t10_50_status",
              "$t10_60_status",

              "$t11_10_status",
              "$t11_20_status",
              "$t11_30_status",
              "$t11_40_status",
              "$t11_50_status",
              "$t11_60_status",

              "$t12_10_status",
              "$t12_20_status",
              "$t12_30_status",
              "$t12_40_status",
              "$t12_50_status",
              "$t12_60_status",

              "$t13_10_status",
              "$t13_20_status",
              "$t13_30_status",
              "$t13_40_status",
              "$t13_50_status",
              "$t13_60_status",

              "$t14_10_status",
              "$t14_20_status",
              "$t14_30_status",
              "$t14_40_status",
              "$t14_50_status",
              "$t14_60_status",

              "$t15_10_status",
              "$t15_20_status",
              "$t15_30_status",
              "$t15_40_status",
              "$t15_50_status",
              "$t15_60_status",

              "$t16_10_status",
              "$t16_20_status",
              "$t16_30_status",
              "$t16_40_status",
              "$t16_50_status",
              "$t16_60_status",

              "$t17_10_status",
              "$t17_20_status",
              "$t17_30_status",
              "$t17_40_status",
              "$t17_50_status",
              "$t17_60_status",

              "$t18_10_status",
              "$t18_20_status",
              "$t18_30_status",
              "$t18_40_status",
              "$t18_50_status",
              "$t18_60_status",

              "$t19_10_status",
              "$t19_20_status",
              "$t19_30_status",
              "$t19_40_status",
              "$t19_50_status",
              "$t19_60_status",

              "$t20_10_status",
              "$t20_20_status",
              "$t20_30_status",
              "$t20_40_status",
              "$t20_50_status",
              "$t20_60_status",

              "$t21_10_status",
              "$t21_20_status",
              "$t21_30_status",
              "$t21_40_status",
              "$t21_50_status",
              "$t21_60_status",

              "$t22_10_status",
              "$t22_20_status",
              "$t22_30_status",
              "$t22_40_status",
              "$t22_50_status",
              "$t22_60_status",

              "$t23_10_status",
              "$t23_20_status",
              "$t23_30_status",
              "$t23_40_status",
              "$t23_50_status",
              "$t23_60_status",
              
            ],
          },
        },
        shift_working_minutes: {
          $sum: {
            $add: [
              "$t6_10_in_shift",
              "$t6_20_in_shift",
              "$t6_30_in_shift",
              "$t6_40_in_shift",
              "$t6_50_in_shift",
              "$t6_60_in_shift",

              "$t7_10_in_shift",
              "$t7_20_in_shift",
              "$t7_30_in_shift",
              "$t7_40_in_shift",
              "$t7_50_in_shift",
              "$t7_60_in_shift",

              "$t8_10_in_shift",
              "$t8_20_in_shift",
              "$t8_30_in_shift",
              "$t8_40_in_shift",
              "$t8_50_in_shift",
              "$t8_60_in_shift",

              "$t9_10_in_shift",
              "$t9_20_in_shift",
              "$t9_30_in_shift",
              "$t9_40_in_shift",
              "$t9_50_in_shift",
              "$t9_60_in_shift",

              "$t10_10_in_shift",
              "$t10_20_in_shift",
              "$t10_30_in_shift",
              "$t10_40_in_shift",
              "$t10_50_in_shift",
              "$t10_60_in_shift",

              "$t11_10_in_shift",
              "$t11_20_in_shift",
              "$t11_30_in_shift",
              "$t11_40_in_shift",
              "$t11_50_in_shift",
              "$t11_60_in_shift",

              "$t12_10_in_shift",
              "$t12_20_in_shift",
              "$t12_30_in_shift",
              "$t12_40_in_shift",
              "$t12_50_in_shift",
              "$t12_60_in_shift",

              "$t13_10_in_shift",
              "$t13_20_in_shift",
              "$t13_30_in_shift",
              "$t13_40_in_shift",
              "$t13_50_in_shift",
              "$t13_60_in_shift",

              "$t14_10_in_shift",
              "$t14_20_in_shift",
              "$t14_30_in_shift",
              "$t14_40_in_shift",
              "$t14_50_in_shift",
              "$t14_60_in_shift",

              "$t15_10_in_shift",
              "$t15_20_in_shift",
              "$t15_30_in_shift",
              "$t15_40_in_shift",
              "$t15_50_in_shift",
              "$t15_60_in_shift",

              "$t16_10_in_shift",
              "$t16_20_in_shift",
              "$t16_30_in_shift",
              "$t16_40_in_shift",
              "$t16_50_in_shift",
              "$t16_60_in_shift",

              "$t17_10_in_shift",
              "$t17_20_in_shift",
              "$t17_30_in_shift",
              "$t17_40_in_shift",
              "$t17_50_in_shift",
              "$t17_60_in_shift",

              "$t18_10_in_shift",
              "$t18_20_in_shift",
              "$t18_30_in_shift",
              "$t18_40_in_shift",
              "$t18_50_in_shift",
              "$t18_60_in_shift",

              "$t19_10_in_shift",
              "$t19_20_in_shift",
              "$t19_30_in_shift",
              "$t19_40_in_shift",
              "$t19_50_in_shift",
              "$t19_60_in_shift",

              "$t20_10_in_shift",
              "$t20_20_in_shift",
              "$t20_30_in_shift",
              "$t20_40_in_shift",
              "$t20_50_in_shift",
              "$t20_60_in_shift",

              "$t21_10_in_shift",
              "$t21_20_in_shift",
              "$t21_30_in_shift",
              "$t21_40_in_shift",
              "$t21_50_in_shift",
              "$t21_60_in_shift",

              "$t22_10_in_shift",
              "$t22_20_in_shift",
              "$t22_30_in_shift",
              "$t22_40_in_shift",
              "$t22_50_in_shift",
              "$t22_60_in_shift",

              "$t23_10_in_shift",
              "$t23_20_in_shift",
              "$t23_30_in_shift",
              "$t23_40_in_shift",
              "$t23_50_in_shift",
              "$t23_60_in_shift"
     
            ],
          },
        },
      },
    },
    // Third Stage
    {
      $sort: { total_working_minutes: -1 },
    },
  ]);

  if (data) {
    res.status(200).json({
      status: true,
      data: data,
    });
  } else {
    res.status(200).json({
      status: false,
      data: [],
    });
  }
  //res.status(200).json( results );

  /*
        console.log( results ); 
        workingHours = results.map(function(doc) { 
            //doc.total_working_minutes = doc.total_working_minutes * 10
            //doc.shift_working_minutes = doc.shift_working_minutes * 10
            
            
            
            // doc._id = doc.origId;
            // delete doc.origId;
            return doc; 
        });
        res.status(200).json( 
            {   
                "status" : true, 
                "data" : workingHours 
            }
        );
        */
};




exports.workingHours3 = async (req, res, next) => {
  var dateFrom = req.query.from ?? "";
  var dateTo = req.query.to ?? "";

  from = moment(dateFrom, 'YYYY-MM-DD').startOf('day');
  to = moment(dateTo, 'YYYY-MM-DD').startOf('day');

  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://127.0.0.1:20000/";
  const cl = new MongoClient("mongodb://localhost:20000");

  try {
      await cl.connect();
      const dbs= cl.db("live_tracking");
      const coll = dbs.collection("workinghours");


      var data = dbs.workinghours.find({}, {})

      // var data = coll.aggregate([
      //   {$group : {_id:"$name", count:{$sum:1}}}
      // ])


/*
      const cur = coll.find({}, {});

      let data = [];
      await cur.forEach(function(doc){
        data.push(doc);
      });

*/


      
      res.end(JSON.stringify(data));
  } catch (err){
      console.warn("ERROR: " + err);
      if (errCallback) errCallback(err);
  } finally {
      await cl.close();
  }
}

