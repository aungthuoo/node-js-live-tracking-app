let mongoose = require('mongoose')
let validator = require('validator')

let workingHourIntervalSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        //lowercase: true,
    },
    
    name: {
        type: String,
        required: true,
        //lowercase: true,
    },
    t6_00_10 : {
        type: Number,
        default: 0
    }, 
    t6_11_20 : {
        type: Number,
        default: 0
    }, 
    /*
    t6_21_30 : {
        type: Number,
        default: 0
    }, 
    t6_31_40 : {
        type: Number,
        default: 0
    }, 
    t6_41_50 : {
        type: Number,
        default: 0
    },
    t6_51_60 : {
        type: Number,
        default: 0
    },

//  7
    t7_00_10 : {
        type: Number,
        default: 0
    }, 
    t7_11_20 : {
        type: Number,
        default: 0
    }, 
    t7_21_30 : {
        type: Number,
        default: 0
    }, 
    t7_31_40 : {
        type: Number,
        default: 0
    }, 
    t7_41_50 : {
        type: Number,
        default: 0
    },
    t7_51_60 : {
        type: Number,
        default: 0
    },

//  8
    t8_00_10 : {
        type: Number,
        default: 0
    }, 
    t8_11_20 : {
        type: Number,
        default: 0
    }, 
    t8_21_30 : {
        type: Number,
        default: 0
    }, 
    t8_31_40 : {
        type: Number,
        default: 0
    }, 
    t8_41_50 : {
        type: Number,
        default: 0
    },
    t8_51_60 : {
        type: Number,
        default: 0
    },

    //  9
    t9_00_10 : {
        type: Number,
        default: 0
    }, 
    t9_11_20 : {
        type: Number,
        default: 0
    }, 
    t9_21_30 : {
        type: Number,
        default: 0
    }, 
    t9_31_40 : {
        type: Number,
        default: 0
    }, 
    t9_41_50 : {
        type: Number,
        default: 0
    },
    t9_51_60 : {
        type: Number,
        default: 0
    },

    //  10
    t10_00_10 : {
        type: Number,
        default: 0
    }, 
    t10_11_20 : {
        type: Number,
        default: 0
    }, 
    t10_21_30 : {
        type: Number,
        default: 0
    }, 
    t10_31_40 : {
        type: Number,
        default: 0
    }, 
    t10_41_50 : {
        type: Number,
        default: 0
    },
    t10_51_60 : {
        type: Number,
        default: 0
    },

    //  11
    t11_00_10 : {
        type: Number,
        default: 0
    }, 
    t11_11_20 : {
        type: Number,
        default: 0
    }, 
    t11_21_30 : {
        type: Number,
        default: 0
    }, 
    t11_31_40 : {
        type: Number,
        default: 0
    }, 
    t11_41_50 : {
        type: Number,
        default: 0
    },
    t11_51_60 : {
        type: Number,
        default: 0
    },
    //  12
    t12_00_10 : {
        type: Number,
        default: 0
    }, 
    t12_11_20 : {
        type: Number,
        default: 0
    }, 
    t12_21_30 : {
        type: Number,
        default: 0
    }, 
    t12_31_40 : {
        type: Number,
        default: 0
    }, 
    t12_41_50 : {
        type: Number,
        default: 0
    },
    t12_51_60 : {
        type: Number,
        default: 0
    },

   //  12
    t13_00_10 : {
        type: Number,
        default: 0
    }, 
    t13_11_20 : {
        type: Number,
        default: 0
    }, 
    t13_21_30 : {
        type: Number,
        default: 0
    }, 
    t13_31_40 : {
        type: Number,
        default: 0
    }, 
    t13_41_50 : {
        type: Number,
        default: 0
    },
    t13_51_60 : {
        type: Number,
        default: 0
    },


   //  14
    t14_00_10 : {
        type: Number,
        default: 0
    }, 
    t14_11_20 : {
        type: Number,
        default: 0
    }, 
    t14_21_30 : {
        type: Number,
        default: 0
    }, 
    t14_31_40 : {
        type: Number,
        default: 0
    }, 
    t14_41_50 : {
        type: Number,
        default: 0
    },
    t14_51_60 : {
        type: Number,
        default: 0
    },


   //  15
    t15_00_10 : {
        type: Number,
        default: 0
    }, 
    t15_11_20 : {
        type: Number,
        default: 0
    }, 
    t15_21_30 : {
        type: Number,
        default: 0
    }, 
    t15_31_40 : {
        type: Number,
        default: 0
    }, 
    t15_41_50 : {
        type: Number,
        default: 0
    },
    t15_51_60 : {
        type: Number,
        default: 0
    },


   //  16
    t16_00_10 : {
        type: Number,
        default: 0
    }, 
    t16_11_20 : {
        type: Number,
        default: 0
    }, 
    t16_21_30 : {
        type: Number,
        default: 0
    }, 
    t16_31_40 : {
        type: Number,
        default: 0
    }, 
    t16_41_50 : {
        type: Number,
        default: 0
    },
    t16_51_60 : {
        type: Number,
        default: 0
    },


   //  17
    t17_00_10 : {
        type: Number,
        default: 0
    }, 
    t17_11_20 : {
        type: Number,
        default: 0
    }, 
    t17_21_30 : {
        type: Number,
        default: 0
    }, 
    t17_31_40 : {
        type: Number,
        default: 0
    }, 
    t17_41_50 : {
        type: Number,
        default: 0
    },
    t17_51_60 : {
        type: Number,
        default: 0
    },

   //  18
    t18_00_10 : {
        type: Number,
        default: 0
    }, 
    t18_11_20 : {
        type: Number,
        default: 0
    }, 
    t18_21_30 : {
        type: Number,
        default: 0
    }, 
    t18_31_40 : {
        type: Number,
        default: 0
    }, 
    t18_41_50 : {
        type: Number,
        default: 0
    },
    t18_51_60 : {
        type: Number,
        default: 0
    },


   //  18
    t19_00_10 : {
        type: Number,
        default: 0
    }, 
    t19_11_20 : {
        type: Number,
        default: 0
    }, 
    t19_21_30 : {
        type: Number,
        default: 0
    }, 
    t19_31_40 : {
        type: Number,
        default: 0
    }, 
    t19_41_50 : {
        type: Number,
        default: 0
    },
    t19_51_60 : {
        type: Number,
        default: 0
    },



   //  18
    t20_00_10 : {
        type: Number,
        default: 0
    }, 
    t20_11_20 : {
        type: Number,
        default: 0
    }, 
    t20_21_30 : {
        type: Number,
        default: 0
    }, 
    t20_31_40 : {
        type: Number,
        default: 0
    }, 
    t20_41_50 : {
        type: Number,
        default: 0
    },
    t20_51_60 : {
        type: Number,
        default: 0
    },




   //  21
    t21_00_10 : {
        type: Number,
        default: 0
    }, 
    t21_11_20 : {
        type: Number,
        default: 0
    }, 
    t21_21_30 : {
        type: Number,
        default: 0
    }, 
    t21_31_40 : {
        type: Number,
        default: 0
    }, 
    t21_41_50 : {
        type: Number,
        default: 0
    },
    t21_51_60 : {
        type: Number,
        default: 0
    },


   //  22
    t22_00_10 : {
        type: Number,
        default: 0
    }, 
    t22_11_20 : {
        type: Number,
        default: 0
    }, 
    t22_21_30 : {
        type: Number,
        default: 0
    }, 
    t22_31_40 : {
        type: Number,
        default: 0
    }, 
    t22_41_50 : {
        type: Number,
        default: 0
    },
    t22_51_60 : {
        type: Number,
        default: 0
    },

   //  23
    t23_00_10 : {
        type: Number,
        default: 0
    }, 
    t23_11_20 : {
        type: Number,
        default: 0
    }, 
    t23_21_30 : {
        type: Number,
        default: 0
    }, 
    t23_31_40 : {
        type: Number,
        default: 0
    }, 
    t23_41_50 : {
        type: Number,
        default: 0
    },
    t23_51_60 : {
        type: Number,
        default: 0
    },
    */
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('WorkingHourInterval', workingHourIntervalSchema)