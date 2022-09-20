const redis = require("redis");
const redisSubscriber = redis.createClient();

exports.history = (req, res, next) => {
  res.render("pages/history", {
    root: __dirname,
  });
};
