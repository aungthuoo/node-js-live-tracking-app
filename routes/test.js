const router = require('express').Router();
const {datetime, shiftStartEnd} = require('../controllers/testController');

//router.post('/update', update);
router.get('/datetime', datetime);
//router.get('/shift-start-end', shiftStartEnd);

module.exports = router;