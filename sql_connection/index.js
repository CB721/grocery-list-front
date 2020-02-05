const mysql = require("mysql");

var connection;
var env = process.env.JAWSDB_URL;
connection = mysql.createConnection(env);
connection.connect(err => {
  if (err) throw err;
});


module.exports = connection;