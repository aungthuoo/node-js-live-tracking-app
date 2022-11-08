const bcrypt = require("bcrypt");
const conn = require("../utils/mysql");

exports.login = async (req, res, next) => {
  /*
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("error", "Provide Email and Password");
    return res.redirect("/");
  }

  const [users, fields] = await conn.execute(
    "SELECT * FROM `users` WHERE `email` = ?",
    [email]
  );

  if (!users.length) {
    req.flash("error", "There is no account with this email");
    return res.redirect("/");
  }

  // Account exists, check Password
  const currentUser = users[0];

  let password_hash = currentUser["password"];
  password_hash = password_hash.replace(/^\$2y(.+)$/i, "$2a$1");

  bcrypt.compare(password, password_hash, function (err, result) {
    if (result) {
      // Login Succcess
      req.session.isLogin = true;
      req.flash("success", "Login Successful");

      return res.redirect("/maps");
    } else {
      req.flash("error", "Incorrect Password");
      return res.redirect("/");
    }
  });
  */
};

exports.isLogin = (req, res, next) => {
  // if (!req.session.isLogin) {
  //   return res.redirect("/");
  // }
  next();
};
