const sqlDB = require("../sql_connection");
const mongoose = require("mongoose");

module.exports = {
    createUser: function(req, res) {
        // check if password is at least 8 characters
        // check if email already exists - mongo
        // const date = new Date;
        // create user in mongo
            // only email is saved in mongo 
        // transfer id, email, to sql
        // password gets hashed and sent directly to sql
        console.log(req.body);
    }
}