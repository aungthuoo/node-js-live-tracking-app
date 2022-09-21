const redis = require("redis");
const redisSubscriber = redis.createClient();

exports.map = (req, res, next) => {
  redisSubscriber.subscribe("locationUpdateABC");
  res.render("pages/maps", {
    root: __dirname,
  });
};
