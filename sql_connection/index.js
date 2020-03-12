const mysql = require("mysql");

let connection;
const config = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  ssl: true
};

connection = mysql.createConnection(config);
connection.connect(err => {
  if (err) {
    console.log("sql connection error: ");
    console.log(err);
  }
});

module.exports = connection;