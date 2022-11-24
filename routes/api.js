const router = require('express').Router();
const { workingHours} = require('../controllers/apiController');


router.get('/working-hours', workingHours);

module.exports = router;