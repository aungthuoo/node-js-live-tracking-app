let mongoose = require("mongoose");
require("dotenv").config();

const dbServerIp = process.env.DB_SERVER_IP;
const database = process.env.DATABASE;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${dbServerIp}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Database();
