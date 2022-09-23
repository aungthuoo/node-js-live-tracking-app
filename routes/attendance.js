const router = require('express').Router();
const {index, active, save, update} = require('../controllers/attendanceController');

router.get('/index', index);
router.get('/active', active);
router.post('/update', update);
router.post('/save', save);

module.exports = router;