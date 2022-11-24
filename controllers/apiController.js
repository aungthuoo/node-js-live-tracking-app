let WorkingHourInterval = require("../models/workingHourInterval");
const moment = require("moment");
const helper = require("../helpers.js");
const axios = require("axios");

exports.workingHour = async (req, res, next) => {
  var _id = req.query.user_id ?? 0;
  const today = moment().startOf("day");

  var query = {
    user_id: _id,
    created_at: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  };

  res.status(200).json(query);

  WorkingHourInterval.findOne(query, (err, item) => {
    if (err) console.error(err);

    console.log(item);
    //res.status(200).json( {"data" : item });

    let totalWorkingHours =
      item.working_hours.t6_10.status +
      item.working_hours.t6_20.status +
      item.working_hours.t6_30.status +
      item.working_hours.t6_40.status +
      item.working_hours.t6_50.status +
      item.working_hours.t6_60.status +
      item.working_hours.t7_10.status +
      item.working_hours.t7_20.status +
      item.working_hours.t7_30.status +
      item.working_hours.t7_40.status +
      item.working_hours.t7_50.status +
      item.working_hours.t7_60.status +
      item.working_hours.t8_10.status +
      item.working_hours.t8_20.status +
      item.working_hours.t8_30.status +
      item.working_hours.t8_40.status +
      item.working_hours.t8_50.status +
      item.working_hours.t8_60.status +
      item.working_hours.t9_10.status +
      item.working_hours.t9_20.status +
      item.working_hours.t9_30.status +
      item.working_hours.t9_40.status +
      item.working_hours.t9_50.status +
      item.working_hours.t9_60.status +
      item.working_hours.t10_10.status +
      item.working_hours.t10_20.status +
      item.working_hours.t10_30.status +
      item.working_hours.t10_40.status +
      item.working_hours.t10_50.status +
      item.working_hours.t10_60.status +
      item.working_hours.t11_10.status +
      item.working_hours.t11_20.status +
      item.working_hours.t11_30.status +
      item.working_hours.t11_40.status +
      item.working_hours.t11_50.status +
      item.working_hours.t11_60.status +
      item.working_hours.t12_10.status +
      item.working_hours.t12_20.status +
      item.working_hours.t12_30.status +
      item.working_hours.t12_40.status +
      item.working_hours.t12_50.status +
      item.working_hours.t12_60.status +
      item.working_hours.t13_10.status +
      item.working_hours.t13_20.status +
      item.working_hours.t13_30.status +
      item.working_hours.t13_40.status +
      item.working_hours.t13_50.status +
      item.working_hours.t13_60.status +
      item.working_hours.t14_10.status +
      item.working_hours.t14_20.status +
      item.working_hours.t14_30.status +
      item.working_hours.t14_40.status +
      item.working_hours.t14_50.status +
      item.working_hours.t14_60.status +
      item.working_hours.t15_10.status +
      item.working_hours.t15_20.status +
      item.working_hours.t15_30.status +
      item.working_hours.t15_40.status +
      item.working_hours.t15_50.status +
      item.working_hours.t15_60.status +
      item.working_hours.t16_10.status +
      item.working_hours.t16_20.status +
      item.working_hours.t16_30.status +
      item.working_hours.t16_40.status +
      item.working_hours.t16_50.status +
      item.working_hours.t16_60.status +
      item.working_hours.t17_10.status +
      item.working_hours.t17_20.status +
      item.working_hours.t17_30.status +
      item.working_hours.t17_40.status +
      item.working_hours.t17_50.status +
      item.working_hours.t17_60.status +
      item.working_hours.t18_10.status +
      item.working_hours.t18_20.status +
      item.working_hours.t18_30.status +
      item.working_hours.t18_40.status +
      item.working_hours.t18_50.status +
      item.working_hours.t18_60.status +
      item.working_hours.t19_10.status +
      item.working_hours.t19_20.status +
      item.working_hours.t19_30.status +
      item.working_hours.t19_40.status +
      item.working_hours.t19_50.status +
      item.working_hours.t19_60.status +
      item.working_hours.t20_10.status +
      item.working_hours.t20_20.status +
      item.working_hours.t20_30.status +
      item.working_hours.t20_40.status +
      item.working_hours.t20_50.status +
      item.working_hours.t20_60.status +
      item.working_hours.t21_10.status +
      item.working_hours.t21_20.status +
      item.working_hours.t21_30.status +
      item.working_hours.t21_40.status +
      item.working_hours.t21_50.status +
      item.working_hours.t21_60.status +
      item.working_hours.t22_10.status +
      item.working_hours.t22_20.status +
      item.working_hours.t22_30.status +
      item.working_hours.t22_40.status +
      item.working_hours.t22_50.status +
      item.working_hours.t22_60.status +
      item.working_hours.t23_10.status +
      item.working_hours.t23_20.status +
      item.working_hours.t23_30.status +
      item.working_hours.t23_40.status +
      item.working_hours.t23_50.status +
      item.working_hours.t23_60.status;

    let shiftWorkingHours =
      item.working_hours.t6_10.in_shift +
      item.working_hours.t6_20.in_shift +
      item.working_hours.t6_30.in_shift +
      item.working_hours.t6_40.in_shift +
      item.working_hours.t6_50.in_shift +
      item.working_hours.t6_60.in_shift +
      item.working_hours.t7_10.in_shift +
      item.working_hours.t7_20.in_shift +
      item.working_hours.t7_30.in_shift +
      item.working_hours.t7_40.in_shift +
      item.working_hours.t7_50.in_shift +
      item.working_hours.t7_60.in_shift +
      item.working_hours.t8_10.in_shift +
      item.working_hours.t8_20.in_shift +
      item.working_hours.t8_30.in_shift +
      item.working_hours.t8_40.in_shift +
      item.working_hours.t8_50.in_shift +
      item.working_hours.t8_60.in_shift +
      item.working_hours.t9_10.in_shift +
      item.working_hours.t9_20.in_shift +
      item.working_hours.t9_30.in_shift +
      item.working_hours.t9_40.in_shift +
      item.working_hours.t9_50.in_shift +
      item.working_hours.t9_60.in_shift +
      item.working_hours.t10_10.in_shift +
      item.working_hours.t10_20.in_shift +
      item.working_hours.t10_30.in_shift +
      item.working_hours.t10_40.in_shift +
      item.working_hours.t10_50.in_shift +
      item.working_hours.t10_60.in_shift +
      item.working_hours.t11_10.in_shift +
      item.working_hours.t11_20.in_shift +
      item.working_hours.t11_30.in_shift +
      item.working_hours.t11_40.in_shift +
      item.working_hours.t11_50.in_shift +
      item.working_hours.t11_60.in_shift +
      item.working_hours.t12_10.in_shift +
      item.working_hours.t12_20.in_shift +
      item.working_hours.t12_30.in_shift +
      item.working_hours.t12_40.in_shift +
      item.working_hours.t12_50.in_shift +
      item.working_hours.t12_60.in_shift +
      item.working_hours.t13_10.in_shift +
      item.working_hours.t13_20.in_shift +
      item.working_hours.t13_30.in_shift +
      item.working_hours.t13_40.in_shift +
      item.working_hours.t13_50.in_shift +
      item.working_hours.t13_60.in_shift +
      item.working_hours.t14_10.in_shift +
      item.working_hours.t14_20.in_shift +
      item.working_hours.t14_30.in_shift +
      item.working_hours.t14_40.in_shift +
      item.working_hours.t14_50.in_shift +
      item.working_hours.t14_60.in_shift +
      item.working_hours.t15_10.in_shift +
      item.working_hours.t15_20.in_shift +
      item.working_hours.t15_30.in_shift +
      item.working_hours.t15_40.in_shift +
      item.working_hours.t15_50.in_shift +
      item.working_hours.t15_60.in_shift +
      item.working_hours.t16_10.in_shift +
      item.working_hours.t16_20.in_shift +
      item.working_hours.t16_30.in_shift +
      item.working_hours.t16_40.in_shift +
      item.working_hours.t16_50.in_shift +
      item.working_hours.t16_60.in_shift +
      item.working_hours.t17_10.in_shift +
      item.working_hours.t17_20.in_shift +
      item.working_hours.t17_30.in_shift +
      item.working_hours.t17_40.in_shift +
      item.working_hours.t17_50.in_shift +
      item.working_hours.t17_60.in_shift +
      item.working_hours.t18_10.in_shift +
      item.working_hours.t18_20.in_shift +
      item.working_hours.t18_30.in_shift +
      item.working_hours.t18_40.in_shift +
      item.working_hours.t18_50.in_shift +
      item.working_hours.t18_60.in_shift +
      item.working_hours.t19_10.in_shift +
      item.working_hours.t19_20.in_shift +
      item.working_hours.t19_30.in_shift +
      item.working_hours.t19_40.in_shift +
      item.working_hours.t19_50.in_shift +
      item.working_hours.t19_60.in_shift +
      item.working_hours.t20_10.in_shift +
      item.working_hours.t20_20.in_shift +
      item.working_hours.t20_30.in_shift +
      item.working_hours.t20_40.in_shift +
      item.working_hours.t20_50.in_shift +
      item.working_hours.t20_60.in_shift +
      item.working_hours.t21_10.in_shift +
      item.working_hours.t21_20.in_shift +
      item.working_hours.t21_30.in_shift +
      item.working_hours.t21_40.in_shift +
      item.working_hours.t21_50.in_shift +
      item.working_hours.t21_60.in_shift +
      item.working_hours.t22_10.in_shift +
      item.working_hours.t22_20.in_shift +
      item.working_hours.t22_30.in_shift +
      item.working_hours.t22_40.in_shift +
      item.working_hours.t22_50.in_shift +
      item.working_hours.t22_60.in_shift +
      item.working_hours.t23_10.in_shift +
      item.working_hours.t23_20.in_shift +
      item.working_hours.t23_30.in_shift +
      item.working_hours.t23_40.in_shift +
      item.working_hours.t23_50.in_shift +
      item.working_hours.t23_60.in_shift;

    res.status(200).json({
      status: true,
      user_id: _id,
      total_working_hours: totalWorkingHours * 10,
      shift_working_hours: shiftWorkingHours * 10,
    });
  }).sort({ name: "ascending" });
};

exports.workingHours = async (req, res, next) => {
  //var dateFrom = req.query.from ?? "";
  //var dateTo = req.query.to ?? "";

  //from = moment(dateFrom, 'YYYY-MM-DD').startOf('day');
  //to = moment(dateTo, 'YYYY-MM-DD').startOf('day');

  var findDate = req.query.find_date ?? "0";
  findDate = parseInt(findDate);

  // var findDate = 20221115;
  // res.status(200).json(
  //     {
  //         "status" : true,
  //         "data" : parseInt(findDate)
  //     }
  // );

  //var findDate = 20221115;
  //res.status(200).json( {"data" : findDate });
  const data = await WorkingHourInterval.aggregate([
    // First Stage
    {
      $match: {
        /*
                "created_at": {
                    $gte: from.toDate(),
                    $lte: moment(to).endOf('day').toDate()
                }
                */
        tran_date_id: { $eq: findDate },
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
              "$working_hours.t6_10.status",
              "$working_hours.t6_20.status",
              "$working_hours.t6_30.status",
              "$working_hours.t6_40.status",
              "$working_hours.t6_50.status",
              "$working_hours.t6_60.status",

              "$working_hours.t7_10.status",
              "$working_hours.t7_20.status",
              "$working_hours.t7_30.status",
              "$working_hours.t7_40.status",
              "$working_hours.t7_50.status",
              "$working_hours.t7_60.status",

              "$working_hours.t8_10.status",
              "$working_hours.t8_20.status",
              "$working_hours.t8_30.status",
              "$working_hours.t8_40.status",
              "$working_hours.t8_50.status",
              "$working_hours.t8_60.status",

              "$working_hours.t9_10.status",
              "$working_hours.t9_20.status",
              "$working_hours.t9_30.status",
              "$working_hours.t9_40.status",
              "$working_hours.t9_50.status",
              "$working_hours.t9_60.status",

              "$working_hours.t10_10.status",
              "$working_hours.t10_20.status",
              "$working_hours.t10_30.status",
              "$working_hours.t10_40.status",
              "$working_hours.t10_50.status",
              "$working_hours.t10_60.status",

              "$working_hours.t11_10.status",
              "$working_hours.t11_20.status",
              "$working_hours.t11_30.status",
              "$working_hours.t11_40.status",
              "$working_hours.t11_50.status",
              "$working_hours.t11_60.status",

              "$working_hours.t12_10.status",
              "$working_hours.t12_20.status",
              "$working_hours.t12_30.status",
              "$working_hours.t12_40.status",
              "$working_hours.t12_50.status",
              "$working_hours.t12_60.status",

              "$working_hours.t13_10.status",
              "$working_hours.t13_20.status",
              "$working_hours.t13_30.status",
              "$working_hours.t13_40.status",
              "$working_hours.t13_50.status",
              "$working_hours.t13_60.status",

              "$working_hours.t14_10.status",
              "$working_hours.t14_20.status",
              "$working_hours.t14_30.status",
              "$working_hours.t14_40.status",
              "$working_hours.t14_50.status",
              "$working_hours.t14_60.status",

              "$working_hours.t15_10.status",
              "$working_hours.t15_20.status",
              "$working_hours.t15_30.status",
              "$working_hours.t15_40.status",
              "$working_hours.t15_50.status",
              "$working_hours.t15_60.status",

              "$working_hours.t16_10.status",
              "$working_hours.t16_20.status",
              "$working_hours.t16_30.status",
              "$working_hours.t16_40.status",
              "$working_hours.t16_50.status",
              "$working_hours.t16_60.status",

              "$working_hours.t17_10.status",
              "$working_hours.t17_20.status",
              "$working_hours.t17_30.status",
              "$working_hours.t17_40.status",
              "$working_hours.t17_50.status",
              "$working_hours.t17_60.status",

              "$working_hours.t18_10.status",
              "$working_hours.t18_20.status",
              "$working_hours.t18_30.status",
              "$working_hours.t18_40.status",
              "$working_hours.t18_50.status",
              "$working_hours.t18_60.status",

              "$working_hours.t19_10.status",
              "$working_hours.t19_20.status",
              "$working_hours.t19_30.status",
              "$working_hours.t19_40.status",
              "$working_hours.t19_50.status",
              "$working_hours.t19_60.status",

              "$working_hours.t20_10.status",
              "$working_hours.t20_20.status",
              "$working_hours.t20_30.status",
              "$working_hours.t20_40.status",
              "$working_hours.t20_50.status",
              "$working_hours.t20_60.status",

              "$working_hours.t21_10.status",
              "$working_hours.t21_20.status",
              "$working_hours.t21_30.status",
              "$working_hours.t21_40.status",
              "$working_hours.t21_50.status",
              "$working_hours.t21_60.status",

              "$working_hours.t22_10.status",
              "$working_hours.t22_20.status",
              "$working_hours.t22_30.status",
              "$working_hours.t22_40.status",
              "$working_hours.t22_50.status",
              "$working_hours.t22_60.status",

              "$working_hours.t23_10.status",
              "$working_hours.t23_20.status",
              "$working_hours.t23_30.status",
              "$working_hours.t23_40.status",
              "$working_hours.t23_50.status",
              "$working_hours.t23_60.status",
            ],
          },
        },
        shift_working_minutes: {
          $sum: {
            $add: [
              "$working_hours.t6_10.in_shift",
              "$working_hours.t6_20.in_shift",
              "$working_hours.t6_30.in_shift",
              "$working_hours.t6_40.in_shift",
              "$working_hours.t6_50.in_shift",
              "$working_hours.t6_60.in_shift",

              "$working_hours.t7_10.in_shift",
              "$working_hours.t7_20.in_shift",
              "$working_hours.t7_30.in_shift",
              "$working_hours.t7_40.in_shift",
              "$working_hours.t7_50.in_shift",
              "$working_hours.t7_60.in_shift",

              "$working_hours.t8_10.in_shift",
              "$working_hours.t8_20.in_shift",
              "$working_hours.t8_30.in_shift",
              "$working_hours.t8_40.in_shift",
              "$working_hours.t8_50.in_shift",
              "$working_hours.t8_60.in_shift",

              "$working_hours.t9_10.in_shift",
              "$working_hours.t9_20.in_shift",
              "$working_hours.t9_30.in_shift",
              "$working_hours.t9_40.in_shift",
              "$working_hours.t9_50.in_shift",
              "$working_hours.t9_60.in_shift",

              "$working_hours.t10_10.in_shift",
              "$working_hours.t10_20.in_shift",
              "$working_hours.t10_30.in_shift",
              "$working_hours.t10_40.in_shift",
              "$working_hours.t10_50.in_shift",
              "$working_hours.t10_60.in_shift",

              "$working_hours.t11_10.in_shift",
              "$working_hours.t11_20.in_shift",
              "$working_hours.t11_30.in_shift",
              "$working_hours.t11_40.in_shift",
              "$working_hours.t11_50.in_shift",
              "$working_hours.t11_60.in_shift",

              "$working_hours.t12_10.in_shift",
              "$working_hours.t12_20.in_shift",
              "$working_hours.t12_30.in_shift",
              "$working_hours.t12_40.in_shift",
              "$working_hours.t12_50.in_shift",
              "$working_hours.t12_60.in_shift",

              "$working_hours.t13_10.in_shift",
              "$working_hours.t13_20.in_shift",
              "$working_hours.t13_30.in_shift",
              "$working_hours.t13_40.in_shift",
              "$working_hours.t13_50.in_shift",
              "$working_hours.t13_60.in_shift",

              "$working_hours.t14_10.in_shift",
              "$working_hours.t14_20.in_shift",
              "$working_hours.t14_30.in_shift",
              "$working_hours.t14_40.in_shift",
              "$working_hours.t14_50.in_shift",
              "$working_hours.t14_60.in_shift",

              "$working_hours.t15_10.in_shift",
              "$working_hours.t15_20.in_shift",
              "$working_hours.t15_30.in_shift",
              "$working_hours.t15_40.in_shift",
              "$working_hours.t15_50.in_shift",
              "$working_hours.t15_60.in_shift",

              "$working_hours.t16_10.in_shift",
              "$working_hours.t16_20.in_shift",
              "$working_hours.t16_30.in_shift",
              "$working_hours.t16_40.in_shift",
              "$working_hours.t16_50.in_shift",
              "$working_hours.t16_60.in_shift",

              "$working_hours.t17_10.in_shift",
              "$working_hours.t17_20.in_shift",
              "$working_hours.t17_30.in_shift",
              "$working_hours.t17_40.in_shift",
              "$working_hours.t17_50.in_shift",
              "$working_hours.t17_60.in_shift",

              "$working_hours.t18_10.in_shift",
              "$working_hours.t18_20.in_shift",
              "$working_hours.t18_30.in_shift",
              "$working_hours.t18_40.in_shift",
              "$working_hours.t18_50.in_shift",
              "$working_hours.t18_60.in_shift",

              "$working_hours.t19_10.in_shift",
              "$working_hours.t19_20.in_shift",
              "$working_hours.t19_30.in_shift",
              "$working_hours.t19_40.in_shift",
              "$working_hours.t19_50.in_shift",
              "$working_hours.t19_60.in_shift",

              "$working_hours.t20_10.in_shift",
              "$working_hours.t20_20.in_shift",
              "$working_hours.t20_30.in_shift",
              "$working_hours.t20_40.in_shift",
              "$working_hours.t20_50.in_shift",
              "$working_hours.t20_60.in_shift",

              "$working_hours.t21_10.in_shift",
              "$working_hours.t21_20.in_shift",
              "$working_hours.t21_30.in_shift",
              "$working_hours.t21_40.in_shift",
              "$working_hours.t21_50.in_shift",
              "$working_hours.t21_60.in_shift",

              "$working_hours.t22_10.in_shift",
              "$working_hours.t22_20.in_shift",
              "$working_hours.t22_30.in_shift",
              "$working_hours.t22_40.in_shift",
              "$working_hours.t22_50.in_shift",
              "$working_hours.t22_60.in_shift",

              "$working_hours.t23_10.in_shift",
              "$working_hours.t23_20.in_shift",
              "$working_hours.t23_30.in_shift",
              "$working_hours.t23_40.in_shift",
              "$working_hours.t23_50.in_shift",
              "$working_hours.t23_60.in_shift",
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
