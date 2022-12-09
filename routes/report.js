const router = require('express').Router();
const {reportDashboard, dailyAttendance, workingHour, workHour } = require('../controllers/reportController');

router.get('/', reportDashboard);
router.get('/attendance', dailyAttendance);
router.get('/working-hour', workingHour);


//New 
router.get('/work-hour', workHour);



module.exports = router;