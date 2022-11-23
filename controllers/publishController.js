exports.publish = (req, res, next) => {
  // res.sendFile("views/publisher.html", {
  //   root: __dirname,
  // });


  res.render("pages/publish", {
    // mascots: mascots,
    // tagline: tagline,
    // error: req.flash("error") ? req.flash('error') : ''
  });



};
