const router = require('express').Router();
const { workingHours, workingHours3, saveWorkingHour} = require('../controllers/apiController');


router.get('/working-hours', workingHours);
router.get('/v2/working-hours', workingHours3);

//New 
router.post('/v2/working-hour', saveWorkingHour);


module.exports = router;