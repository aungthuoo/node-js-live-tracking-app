const router = require('express').Router();
const { workingHours} = require('../controllers/apiController');


router.get('/working-hours', workingHours);
router.get('/v2/working-hours', workingHours);
module.exports = router;