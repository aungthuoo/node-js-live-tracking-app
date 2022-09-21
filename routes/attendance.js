const router = require('express').Router();
const {save, update} = require('../controllers/attendanceController');

router.post('/update', update);
router.post('/save', save);

module.exports = router;