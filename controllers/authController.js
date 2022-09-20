// const conn = require("../db").mysql;

exports.login = (req, res, next) => {
//   conn.execute(
//     "SELECT * FROM `users` WHERE `email` = ?",
//     ["training@gmail.com"],
//     function (err, results, fields) {
//       console.log(results);
//       console.log(fields);
//     }
//   );

  return res.redirect('/map');
};
