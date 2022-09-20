let mongoose = require("mongoose");
let mysql = require("mysql2");

const server = "localhost:27017"; // REPLACE WITH YOUR DB SERVER
const database = "live_tracking"; // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this.mysql = this.connectMySQL();
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.log(err);
        console.error("Database connection error");
      });
  }
  async connectMySQL() {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Kaungmyat81199@",
      database: "fm",
    });
    const conn = await connection.connect();

    return conn;
  }
}

module.exports = new Database();
