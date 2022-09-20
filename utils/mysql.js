const mysql = require("mysql2");
require("dotenv").config();

const dbServerIp = process.env.MYSQL_DB_SERVER;
const dbUser = process.env.MYSQL_DB_USER;
const database = process.env.MYSQL_DATABASE;
const dbPassword = process.env.MYSQL_DB_PASSWORD;

const conn = mysql
  .createConnection({
    host: dbServerIp,
    user: dbUser,
    password: dbPassword,
    database: database,
  })
  .promise();

module.exports = conn;
