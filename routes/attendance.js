const router = require('express').Router();
const {index, active, save, update, daily, updateWorkingHourInterval, 
        showTestRecord, updateTestRecord, workingHour, todayShiftInfo, workingHours
        
    } = require('../controllers/attendanceController');

router.get('/index', index);
router.get('/active', active);
router.post('/update', update);

router.post('/save', save);
router.post('/update-working-hour-interval', updateWorkingHourInterval);
router.get('/show-test-record', showTestRecord);
router.post('/update-test-record', updateTestRecord);
router.get('/working-hour', workingHour);
router.get('/working-hours', workingHours);

router.post('/today-shift-info', todayShiftInfo);



module.exports = router;