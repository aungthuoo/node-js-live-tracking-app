const router = require('express').Router();
const {assign, timeDiff} = require('../controllers/jobController');

//router.post('/users', user);
router.post('/assign', assign);
router.get('/time-diff', timeDiff);
module.exports = router;