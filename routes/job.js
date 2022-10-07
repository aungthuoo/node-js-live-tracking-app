const router = require('express').Router();
const {assign, timeDiff, todayShiftInfo, workingHour} = require('../controllers/jobController');

//router.post('/users', user);
router.post('/assign', assign);
router.get('/today-shift-info', todayShiftInfo);
router.get('/working-hour', workingHour);
router.get('/time-diff', timeDiff);
module.exports = router;