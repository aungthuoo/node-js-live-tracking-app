const router = require("express").Router();
const { index } = require("../controllers/indexController");
const { map } = require("../controllers/mapController");
const { isLogin } = require("../controllers/authController");

router.get("/", index);
router.get("/maps", isLogin, map);

module.exports = router;