const router = require('express').Router();
const {dailyAttendance } = require('../controllers/reportController');

router.get('/daily-attendance', dailyAttendance);

module.exports = router;