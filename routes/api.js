const router = require('express').Router();
const { workingHours, workingHours3} = require('../controllers/apiController');


router.get('/working-hours', workingHours);
router.get('/v2/working-hours', workingHours3);
module.exports = router;