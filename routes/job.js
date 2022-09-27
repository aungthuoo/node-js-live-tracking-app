const router = require('express').Router();
const {assign} = require('../controllers/jobController');

//router.post('/users', user);
router.post('/assign', assign);

module.exports = router;