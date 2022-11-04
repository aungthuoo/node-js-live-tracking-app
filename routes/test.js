const router = require('express').Router();
const {datetime, shiftStartEnd, inShift, fixDuplicatedRecord, saveWorkingHour} = require('../controllers/testController');

//router.post('/update', update);
router.get('/datetime', datetime);
//router.get('/shift-start-end', shiftStartEnd);
router.post('/in-shift', inShift);



router.get('/fix-duplicated-record', fixDuplicatedRecord);
router.get('/save-working-hour', saveWorkingHour);

module.exports = router;