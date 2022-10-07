const router = require('express').Router();
const {reportDashboard, dailyAttendance } = require('../controllers/reportController');

router.get('/', reportDashboard);
router.get('/daily-attendance', dailyAttendance);

module.exports = router;