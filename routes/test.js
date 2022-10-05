const router = require('express').Router();
const {datetime} = require('../controllers/testController');

//router.post('/update', update);
router.get('/datetime', datetime);

module.exports = router;