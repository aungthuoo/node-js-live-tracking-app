const helper = require("./helpers.js");
const WorkingHourInterval = require("./models/workingHourInterval");
let UserModel = require("./models/user");

module.exports.echo = function echo(input) {
    process.stdout.write(input);
}


/*
module.exports.saveWorkingHour = async function saveWorkingHour(data) {
	debugger; 
	var userId = data.user_id ?? 0;
	var name = data.username ?? "";
	var inShiftStatus = data.in_shift ?? 1;

	//var tranDateId = data.tran_date_id ?? 0; 
	//var tranDateId = helper.getTranDateId(new Date());
	var tranDateId = 20221124; 

	var query = {
		user_id: userId,
		tran_date_id: tranDateId,
	};
	
	update = {
		user_id: userId,
		name: name,
		tran_date_id: tranDateId,
		created_at: helper.utcDate(new Date()),
		updated_at: helper.utcDate(new Date()),
	};
	
	options = { upsert: true, new: true, setDefaultsOnInsert: true };
	
	
	try {
		// KM
		let existRecord = await WorkingHourInterval.findOne(query);
		if (!existRecord) {
			let workingHours = {
			t6_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t6_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t6_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t6_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t6_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t6_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			// 7:00
			t7_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t7_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t7_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t7_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t7_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t7_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 8:00
			t8_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t8_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t8_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t8_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t8_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t8_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			// 9:00
			t9_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t9_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t9_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t9_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t9_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t9_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			// 10:00
			t10_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t10_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t10_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t10_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t10_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t10_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 11:00
			t11_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t11_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t11_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t11_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t11_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t11_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 12:00
			t12_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t12_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t12_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t12_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t12_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t12_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 13:00
			t13_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t13_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t13_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t13_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t13_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t13_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 14:00
			t14_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t14_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t14_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t14_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t14_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t14_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 15:00
			t15_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 15:00
			t15_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t15_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 16:00
			t16_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t16_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t16_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t16_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t16_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t16_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 17:00
			t17_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t17_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t17_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t17_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t17_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t17_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 18:00
			t18_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t18_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t18_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t18_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t18_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t18_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 19:00
			t19_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t19_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t19_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t19_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t19_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t19_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 20:00
			t20_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t20_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t20_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t20_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t20_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t20_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 21:00
			t21_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t21_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t21_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t21_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t21_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t21_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 22:00
			t22_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t22_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t22_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t22_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t22_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t22_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
		
			// 23:00
			t23_10: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t23_20: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t23_30: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t23_40: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t23_50: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			t23_60: {
				caption: "",
				status: 0,
				hold_count: 0,
				in_shift: 0,
			},
			};
		
			await WorkingHourInterval.create({
			user_id: userId,
			name: name,
			tran_date_id: tranDateId,
			created_at: helper.utcDate(new Date()),
			updated_at: helper.utcDate(new Date()),
			working_hours: workingHours,
			});
		}
		
		let hourColumn,
			minColumn = "";
		
		hourColumn = new Date().getHours();
		let minutes = new Date().getMinutes();
		
		if (minutes >= 50) {
			minColumn = "_60";
		} else if (minutes >= 40) {
			minColumn = "_50";
		} else if (minutes >= 30) {
			minColumn = "_40";
		} else if (minutes >= 20) {
			minColumn = "_30";
		} else if (minutes >= 10) {
			minColumn = "_20";
		} else if (minutes >= 0) {
			minColumn = "_10";
		}
		
		let column = "t" + hourColumn + minColumn;
		query = {
			user_id: userId,
			tran_date_id: tranDateId,
		};
		
		var setQuery = {};
		let statusColumn = `working_hours.${column}.status`;
		let inShiftColumn = `working_hours.${column}.in_shift`;
		setQuery[statusColumn] = 1;
		setQuery[inShiftColumn] = inShiftStatus;


		
		await WorkingHourInterval.findOneAndUpdate(query, { $set: setQuery }, {
			returnOriginal: false , upsert: false
		});
		return;
	} catch (error) {
		return;
	}	
}  
*/


module.exports.saveWorkingHour = async function saveWorkingHour(data) {
    //var userId = req.query.user_id ?? 0; 
    var _id = data.user_id ?? 0; 
    var userId = data.user_id ?? 0; 
    var name = data.username ?? ""; 
    var inShiftStatus = data.in_shift ?? 1; 
    
   
    //const today = moment().startOf('day')
    var tranDateId = helper.getTranDateId(new Date() ); 
    var query = { 
        "user_id": userId, 
        "tran_date_id" : tranDateId
        /*
        "created_at": {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
        */
    }; 
    update = {
        //id : userId, 
        user_id : userId, 
        name: name, 
        //_field : 1, 
        //cards : [], 
        tran_date_id : tranDateId,  
        created_at : helper.utcDate(new Date()),
        updated_at : helper.utcDate(new Date())
    }; 



    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    WorkingHourInterval.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        //res.status(200).json( { "status" : result });


        if( !result.working_hours ){
                
            var workingHours = {
                "t6_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t6_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t6_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t6_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t6_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t6_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
            // 7:00 
                "t7_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t7_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t7_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t7_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t7_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t7_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
            
                // 8:00 
                "t8_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t8_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t8_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t8_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t8_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t8_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
            // 9:00 
                "t9_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t9_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t9_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t9_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t9_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t9_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
            // 10:00 
                "t10_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t10_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t10_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t10_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t10_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t10_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },

            // 11:00 
                "t11_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t11_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t11_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t11_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t11_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t11_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },


            // 12:00 
                "t12_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t12_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t12_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t12_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t12_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t12_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },


            // 13:00 
                "t13_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t13_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t13_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t13_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t13_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t13_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },

            // 14:00 
                "t14_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t14_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t14_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t14_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t14_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t14_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                
            // 15:00 
                "t15_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 15:00 
                "t15_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t15_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },


            // 16:00 
                "t16_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t16_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t16_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t16_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t16_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t16_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },


            // 17:00 
                "t17_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t17_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t17_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t17_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t17_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t17_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 18:00 
                "t18_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t18_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t18_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t18_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t18_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t18_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },




            // 19:00 
                "t19_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t19_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t19_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t19_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t19_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t19_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 20:00 
                "t20_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t20_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t20_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t20_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t20_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t20_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 21:00 
                "t21_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t21_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t21_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t21_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t21_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t21_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 22:00 
                "t22_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t22_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t22_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t22_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t22_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t22_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },



            // 23:00 
                "t23_10" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t23_20" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t23_30" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t23_40" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t23_50" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
                "t23_60" :  {
                    caption : "",
                    status : 0, 
                    hold_count : 0,
                    in_shift : 0
                },
            }; 


            //res.status(200).json( { "status" : "model", "id": doc._id  });

            WorkingHourInterval.findByIdAndUpdate(result._id,
                {$set:{working_hours:  workingHours }},
                function (err, managerparent) {
                    if (err) throw err;
                    //console.log(managerparent);
                    //res.status(200).json( { "status" : "model", "id": doc._id  });
                    return true; 
                }
            );


        } else {

            var hourColumn, minColumn = ""; 

            hourColumn = new Date().getHours();
            var minutes = new Date().getMinutes();
            // hourColumn = helper.utcDate(new Date()).getHours();
            // var minutes = helper.utcDate(new Date()).getMinutes();

            
            if( minutes >= 50){
                minColumn = "_60"; 
            }else if( minutes >= 40){
                minColumn = "_50"; 
            }else if( minutes >= 30){
                minColumn = "_40"; 
            }else if( minutes >= 20){
                minColumn = "_30";
            }else if( minutes >= 10){
                minColumn = "_20";  
            }else if( minutes >= 0){
                minColumn = "_10";  
            }

            var column = "t" + hourColumn + minColumn; 
            var query = {
                "user_id" : userId,
                "tran_date_id" : tranDateId
                /*
                "created_at": {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                }
                */
            }; 

            
            var setQuery = {};
            let statusColumn = `working_hours.${column}.status`;
            let inShiftColumn = `working_hours.${column}.in_shift`
            setQuery[statusColumn] = 1; 
            setQuery[inShiftColumn] = inShiftStatus; 
            
            //res.status(200).json( setQuery );
            try {
                WorkingHourInterval.findOneAndUpdate(query, {$set: setQuery }, function(err, done) {
                    //console.log(doc);
                    //res.status(200).json( {status : true} );
                    //return done(null, null);
                    //done(null, null);
                    return true; 
                });
            } catch (err) {
                console.log(err);
                //return done(err, null)
                //done(null, null);
                return true; 
            }
        }
       
    });

}

  
