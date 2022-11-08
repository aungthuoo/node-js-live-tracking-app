const router = require("express").Router();
const { index } = require("../controllers/indexController");
const { map } = require("../controllers/mapController");
const { history } = require("../controllers/historyController");
const { publish } = require("../controllers/publishController");
//const { isLogin } = require("../controllers/authController");

router.get("/", index);
//router.get("/maps", isLogin, map);
router.get("/maps", map);
router.get("/publish", isLogin, publish);
router.get("/history", isLogin, history);

module.exports = router;
