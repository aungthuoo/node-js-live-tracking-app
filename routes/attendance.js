const router = require('express').Router();
const {index, active, save, update, daily, updateWorkingHourInterval, showTestRecord, updateTestRecord} = require('../controllers/attendanceController');

router.get('/index', index);
router.get('/active', active);
router.post('/update', update);
router.post('/save', save);
router.post('/update-working-hour-interval', updateWorkingHourInterval);
router.get('/show-test-record', showTestRecord);
router.post('/update-test-record', updateTestRecord);

module.exports = router;