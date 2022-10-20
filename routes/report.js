const router = require('express').Router();
const {reportDashboard, dailyAttendance, workingHour } = require('../controllers/reportController');

router.get('/', reportDashboard);
router.get('/daily-attendance', dailyAttendance);
router.get('/working-hour', workingHour);



module.exports = router;