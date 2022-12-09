let mongoose = require('mongoose')
let validator = require('validator')
//https://stackoverflow.com/questions/35672248/how-to-change-date-timezone-in-mongoose
//const moment = require('moment-timezone');

var current = new Date();
const timeStamp = new Date(Date.UTC(
    current.getFullYear(), 
    current.getMonth(),current.getDate(),
    current.getHours(), 
    current.getMinutes(),
    current.getSeconds(), 
    current.getMilliseconds()));




let userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        //lowercase: true,
    },
    tran_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true,
        //lowercase: true,
    },
    name: {
        type: String,
        //required: true,
        //lowercase: true,
    },








    t6_10_status: {
        type: Number,
        default: 0
    },
    t6_20_status: {
        type: Number,
        default: 0
    },
    t6_30_status: {
        type: Number,
        default: 0
    },
    t6_40_status: {
        type: Number,
        default: 0
    },
    t6_50_status: {
        type: Number,
        default: 0
    },
    t6_60_status: {
        type: Number,
        default: 0
    },
    // 7:00
    t7_10_status: {
        type: Number,
        default: 0
    },
    t7_20_status: {
        type: Number,
        default: 0
    },
    t7_30_status: {
        type: Number,
        default: 0
    },
    t7_40_status: {
        type: Number,
        default: 0
    },
    t7_50_status: {
        type: Number,
        default: 0
    },
    t7_60_status: {
        type: Number,
        default: 0
    },

    // 8:00
    t8_10_status: {
        type: Number,
        default: 0
    },
    t8_20_status: {
        type: Number,
        default: 0
    },
    t8_30_status: {
        type: Number,
        default: 0
    },
    t8_40_status: {
        type: Number,
        default: 0
    },
    t8_50_status: {
        type: Number,
        default: 0
    },
    t8_60_status: {
        type: Number,
        default: 0
    },
    // 9:00
    t9_10_status: {
        type: Number,
        default: 0
    },
    t9_20_status: {
        type: Number,
        default: 0
    },
    t9_30_status: {
        type: Number,
        default: 0
    },
    t9_40_status: {
        type: Number,
        default: 0
    },
    t9_50_status: {
        type: Number,
        default: 0
    },
    t9_60_status: {
        type: Number,
        default: 0
    },
    // 10:00
    t10_10_status: {
        type: Number,
        default: 0
    },
    t10_20_status: {
        type: Number,
        default: 0
    },
    t10_30_status: {
        type: Number,
        default: 0
    },
    t10_40_status: {
        type: Number,
        default: 0
    },
    t10_50_status: {
        type: Number,
        default: 0
    },
    t10_60_status: {
        type: Number,
        default: 0
    },

    // 11:00
    t11_10_status: {
        type: Number,
        default: 0
    },
    t11_20_status: {
        type: Number,
        default: 0
    },
    t11_30_status: {
        type: Number,
        default: 0
    },
    t11_40_status: {
        type: Number,
        default: 0
    },
    t11_50_status: {
        type: Number,
        default: 0
    },
    t11_60_status: {
        type: Number,
        default: 0
    },

    // 12:00
    t12_10_status: {
        type: Number,
        default: 0
    },
    t12_20_status: {
        type: Number,
        default: 0
    },
    t12_30_status: {
        type: Number,
        default: 0
    },
    t12_40_status: {
        type: Number,
        default: 0
    },
    t12_50_status: {
        type: Number,
        default: 0
    },
    t12_60_status: {
        type: Number,
        default: 0
    },

    // 13:00
    t13_10_status: {
        type: Number,
        default: 0
    },
    t13_20_status: {
        type: Number,
        default: 0
    },
    t13_30_status: {
        type: Number,
        default: 0
    },
    t13_40_status: {
        type: Number,
        default: 0
    },
    t13_50_status: {
        type: Number,
        default: 0
    },
    t13_60_status: {
        type: Number,
        default: 0
    },

    // 14:00
    t14_10_status: {
        type: Number,
        default: 0
    },
    t14_20_status: {
        type: Number,
        default: 0
    },
    t14_30_status: {
        type: Number,
        default: 0
    },
    t14_40_status: {
        type: Number,
        default: 0
    },
    t14_50_status: {
        type: Number,
        default: 0
    },
    t14_60_status: {
        type: Number,
        default: 0
    },

    // 15:00
    t15_10_status: {
        type: Number,
        default: 0
    },
    t15_20_status: {
        type: Number,
        default: 0
    },
    t15_30_status: {
        type: Number,
        default: 0
    },
    t15_40_status: {
        type: Number,
        default: 0
    },
    t15_50_status: {
        type: Number,
        default: 0
    },
    t15_60_status: {
        type: Number,
        default: 0
    },

    // 15:00
    t15_10_status: {
        type: Number,
        default: 0
    },
    t15_20_status: {
        type: Number,
        default: 0
    },
    t15_30_status: {
        type: Number,
        default: 0
    },
    t15_40_status: {
        type: Number,
        default: 0
    },
    t15_50_status: {
        type: Number,
        default: 0
    },
    t15_60_status: {
        type: Number,
        default: 0
    },

    // 16:00
    t16_10_status: {
        type: Number,
        default: 0
    },
    t16_20_status: {
        type: Number,
        default: 0
    },
    t16_30_status: {
        type: Number,
        default: 0
    },
    t16_40_status: {
        type: Number,
        default: 0
    },
    t16_50_status: {
        type: Number,
        default: 0
    },
    t16_60_status: {
        type: Number,
        default: 0
    },

    // 17:00
    t17_10_status: {
        type: Number,
        default: 0
    },
    t17_20_status: {
        type: Number,
        default: 0
    },
    t17_30_status: {
        type: Number,
        default: 0
    },
    t17_40_status: {
        type: Number,
        default: 0
    },
    t17_50_status: {
        type: Number,
        default: 0
    },
    t17_60_status: {
        type: Number,
        default: 0
    },

    // 18:00
    t18_10_status: {
        type: Number,
        default: 0
    },
    t18_20_status: {
        type: Number,
        default: 0
    },
    t18_30_status: {
        type: Number,
        default: 0
    },
    t18_40_status: {
        type: Number,
        default: 0
    },
    t18_50_status: {
        type: Number,
        default: 0
    },
    t18_60_status: {
        type: Number,
        default: 0
    },

    // 19:00
    t19_10_status: {
        type: Number,
        default: 0
    },
    t19_20_status: {
        type: Number,
        default: 0
    },
    t19_30_status: {
        type: Number,
        default: 0
    },
    t19_40_status: {
        type: Number,
        default: 0
    },
    t19_50_status: {
        type: Number,
        default: 0
    },
    t19_60_status: {
        type: Number,
        default: 0
    },

    // 20:00
    t20_10_status: {
        type: Number,
        default: 0
    },
    t20_20_status: {
        type: Number,
        default: 0
    },
    t20_30_status: {
        type: Number,
        default: 0
    },
    t20_40_status: {
        type: Number,
        default: 0
    },
    t20_50_status: {
        type: Number,
        default: 0
    },
    t20_60_status: {
        type: Number,
        default: 0
    },

    // 21:00
    t21_10_status: {
        type: Number,
        default: 0
    },
    t21_20_status: {
        type: Number,
        default: 0
    },
    t21_30_status: {
        type: Number,
        default: 0
    },
    t21_40_status: {
        type: Number,
        default: 0
    },
    t21_50_status: {
        type: Number,
        default: 0
    },
    t21_60_status: {
        type: Number,
        default: 0
    },

    // 22:00
    t22_10_status: {
        type: Number,
        default: 0
    },
    t22_20_status: {
        type: Number,
        default: 0
    },
    t22_30_status: {
        type: Number,
        default: 0
    },
    t22_40_status: {
        type: Number,
        default: 0
    },
    t22_50_status: {
        type: Number,
        default: 0
    },
    t22_60_status: {
        type: Number,
        default: 0
    },

    // 23:00
    t23_10_status: {
        type: Number,
        default: 0
    },
    t23_20_status: {
        type: Number,
        default: 0
    },
    t23_30_status: {
        type: Number,
        default: 0
    },
    t23_40_status: {
        type: Number,
        default: 0
    },
    t23_50_status: {
        type: Number,
        default: 0
    },
    t23_60_status: {
        type: Number,
        default: 0
    },

// In shift 
    t6_10_in_shift: {
        type: Number,
        default: 0
    },
    t6_20_in_shift: {
        type: Number,
        default: 0
    },
    t6_30_in_shift: {
        type: Number,
        default: 0
    },
    t6_40_in_shift: {
        type: Number,
        default: 0
    },
    t6_50_in_shift: {
        type: Number,
        default: 0
    },
    t6_60_in_shift: {
        type: Number,
        default: 0
    },
    // 7:00
    t7_10_in_shift: {
        type: Number,
        default: 0
    },
    t7_20_in_shift: {
        type: Number,
        default: 0
    },
    t7_30_in_shift: {
        type: Number,
        default: 0
    },
    t7_40_in_shift: {
        type: Number,
        default: 0
    },
    t7_50_in_shift: {
        type: Number,
        default: 0
    },
    t7_60_in_shift: {
        type: Number,
        default: 0
    },

    // 8:00
    t8_10_in_shift: {
        type: Number,
        default: 0
    },
    t8_20_in_shift: {
        type: Number,
        default: 0
    },
    t8_30_in_shift: {
        type: Number,
        default: 0
    },
    t8_40_in_shift: {
        type: Number,
        default: 0
    },
    t8_50_in_shift: {
        type: Number,
        default: 0
    },
    t8_60_in_shift: {
        type: Number,
        default: 0
    },
    // 9:00
    t9_10_in_shift: {
        type: Number,
        default: 0
    },
    t9_20_in_shift: {
        type: Number,
        default: 0
    },
    t9_30_in_shift: {
        type: Number,
        default: 0
    },
    t9_40_in_shift: {
        type: Number,
        default: 0
    },
    t9_50_in_shift: {
        type: Number,
        default: 0
    },
    t9_60_in_shift: {
        type: Number,
        default: 0
    },
    // 10:00
    t10_10_in_shift: {
        type: Number,
        default: 0
    },
    t10_20_in_shift: {
        type: Number,
        default: 0
    },
    t10_30_in_shift: {
        type: Number,
        default: 0
    },
    t10_40_in_shift: {
        type: Number,
        default: 0
    },
    t10_50_in_shift: {
        type: Number,
        default: 0
    },
    t10_60_in_shift: {
        type: Number,
        default: 0
    },

    // 11:00
    t11_10_in_shift: {
        type: Number,
        default: 0
    },
    t11_20_in_shift: {
        type: Number,
        default: 0
    },
    t11_30_in_shift: {
        type: Number,
        default: 0
    },
    t11_40_in_shift: {
        type: Number,
        default: 0
    },
    t11_50_in_shift: {
        type: Number,
        default: 0
    },
    t11_60_in_shift: {
        type: Number,
        default: 0
    },

    // 12:00
    t12_10_in_shift: {
        type: Number,
        default: 0
    },
    t12_20_in_shift: {
        type: Number,
        default: 0
    },
    t12_30_in_shift: {
        type: Number,
        default: 0
    },
    t12_40_in_shift: {
        type: Number,
        default: 0
    },
    t12_50_in_shift: {
        type: Number,
        default: 0
    },
    t12_60_in_shift: {
        type: Number,
        default: 0
    },

    // 13:00
    t13_10_in_shift: {
        type: Number,
        default: 0
    },
    t13_20_in_shift: {
        type: Number,
        default: 0
    },
    t13_30_in_shift: {
        type: Number,
        default: 0
    },
    t13_40_in_shift: {
        type: Number,
        default: 0
    },
    t13_50_in_shift: {
        type: Number,
        default: 0
    },
    t13_60_in_shift: {
        type: Number,
        default: 0
    },

    // 14:00
    t14_10_in_shift: {
        type: Number,
        default: 0
    },
    t14_20_in_shift: {
        type: Number,
        default: 0
    },
    t14_30_in_shift: {
        type: Number,
        default: 0
    },
    t14_40_in_shift: {
        type: Number,
        default: 0
    },
    t14_50_in_shift: {
        type: Number,
        default: 0
    },
    t14_60_in_shift: {
        type: Number,
        default: 0
    },

    // 15:00
    t15_10_in_shift: {
        type: Number,
        default: 0
    },
    t15_20_in_shift: {
        type: Number,
        default: 0
    },
    t15_30_in_shift: {
        type: Number,
        default: 0
    },
    t15_40_in_shift: {
        type: Number,
        default: 0
    },
    t15_50_in_shift: {
        type: Number,
        default: 0
    },
    t15_60_in_shift: {
        type: Number,
        default: 0
    },

    // 15:00
    t15_10_in_shift: {
        type: Number,
        default: 0
    },
    t15_20_in_shift: {
        type: Number,
        default: 0
    },
    t15_30_in_shift: {
        type: Number,
        default: 0
    },
    t15_40_in_shift: {
        type: Number,
        default: 0
    },
    t15_50_in_shift: {
        type: Number,
        default: 0
    },
    t15_60_in_shift: {
        type: Number,
        default: 0
    },

    // 16:00
    t16_10_in_shift: {
        type: Number,
        default: 0
    },
    t16_20_in_shift: {
        type: Number,
        default: 0
    },
    t16_30_in_shift: {
        type: Number,
        default: 0
    },
    t16_40_in_shift: {
        type: Number,
        default: 0
    },
    t16_50_in_shift: {
        type: Number,
        default: 0
    },
    t16_60_in_shift: {
        type: Number,
        default: 0
    },

    // 17:00
    t17_10_in_shift: {
        type: Number,
        default: 0
    },
    t17_20_in_shift: {
        type: Number,
        default: 0
    },
    t17_30_in_shift: {
        type: Number,
        default: 0
    },
    t17_40_in_shift: {
        type: Number,
        default: 0
    },
    t17_50_in_shift: {
        type: Number,
        default: 0
    },
    t17_60_in_shift: {
        type: Number,
        default: 0
    },

    // 18:00
    t18_10_in_shift: {
        type: Number,
        default: 0
    },
    t18_20_in_shift: {
        type: Number,
        default: 0
    },
    t18_30_in_shift: {
        type: Number,
        default: 0
    },
    t18_40_in_shift: {
        type: Number,
        default: 0
    },
    t18_50_in_shift: {
        type: Number,
        default: 0
    },
    t18_60_in_shift: {
        type: Number,
        default: 0
    },

    // 19:00
    t19_10_in_shift: {
        type: Number,
        default: 0
    },
    t19_20_in_shift: {
        type: Number,
        default: 0
    },
    t19_30_in_shift: {
        type: Number,
        default: 0
    },
    t19_40_in_shift: {
        type: Number,
        default: 0
    },
    t19_50_in_shift: {
        type: Number,
        default: 0
    },
    t19_60_in_shift: {
        type: Number,
        default: 0
    },

    // 20:00
    t20_10_in_shift: {
        type: Number,
        default: 0
    },
    t20_20_in_shift: {
        type: Number,
        default: 0
    },
    t20_30_in_shift: {
        type: Number,
        default: 0
    },
    t20_40_in_shift: {
        type: Number,
        default: 0
    },
    t20_50_in_shift: {
        type: Number,
        default: 0
    },
    t20_60_in_shift: {
        type: Number,
        default: 0
    },

    // 21:00
    t21_10_in_shift: {
        type: Number,
        default: 0
    },
    t21_20_in_shift: {
        type: Number,
        default: 0
    },
    t21_30_in_shift: {
        type: Number,
        default: 0
    },
    t21_40_in_shift: {
        type: Number,
        default: 0
    },
    t21_50_in_shift: {
        type: Number,
        default: 0
    },
    t21_60_in_shift: {
        type: Number,
        default: 0
    },

    // 22:00
    t22_10_in_shift: {
        type: Number,
        default: 0
    },
    t22_20_in_shift: {
        type: Number,
        default: 0
    },
    t22_30_in_shift: {
        type: Number,
        default: 0
    },
    t22_40_in_shift: {
        type: Number,
        default: 0
    },
    t22_50_in_shift: {
        type: Number,
        default: 0
    },
    t22_60_in_shift: {
        type: Number,
        default: 0
    },

    // 23:00
    t23_10_in_shift: {
        type: Number,
        default: 0
    },
    t23_20_in_shift: {
        type: Number,
        default: 0
    },
    t23_30_in_shift: {
        type: Number,
        default: 0
    },
    t23_40_in_shift: {
        type: Number,
        default: 0
    },
    t23_50_in_shift: {
        type: Number,
        default: 0
    },
    t23_60_in_shift: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('WorkHour', userSchema)