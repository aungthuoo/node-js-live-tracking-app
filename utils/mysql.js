const mysql = require("mysql2");

const conn = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "Kaungmyat81199@",
    database: "fm",
  })
  .promise();

module.exports = conn;
