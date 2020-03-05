const mysql = require("mysql");

var connection;
var config = {
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
    console.log(err);
  }
});

// console.log(connection);

module.exports = connection;