const router = require('express').Router();
const {datetime, shiftStartEnd, inShift} = require('../controllers/testController');

//router.post('/update', update);
router.get('/datetime', datetime);
//router.get('/shift-start-end', shiftStartEnd);
router.post('/in-shift', inShift);

module.exports = router;