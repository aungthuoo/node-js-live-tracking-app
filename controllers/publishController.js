exports.publish = (req, res, next) => {
  res.sendFile("views/publisher.html", {
    root: __dirname,
  });
};
