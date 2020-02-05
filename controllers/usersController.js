const sqlDB = require("../sql_connection");
const { User } = require("../mongoose_models");
const mongoose = require("mongoose");
const checkPass = require("../validation/checkPass");
const bcrypt = require("bcryptjs");

module.exports = {
    createUser: function (req, res) {
        const newUser = req.body;
        // check if password is at least 8 characters
        if (!checkPass(newUser.password)) {
            return res.status(400).send("Password must be at least 8 characters");
        }
        // check if email already exists - mongo
        User
            .find({ email: newUser.email })
            .then(response => {
                if (response.length > 0) {
                    return res.status(400).send("Email already exists");
                }
            })
            .catch(err => console.log(err));
        // const date = new Date;
        // create user in mongo
        User
            .create({ email: newUser.email })
            .then(response => {
                res.json(response)
            })
            .catch(err => res.status(422).json(err))
        // only email is saved in mongo 
        // transfer id, email, to sql
        // password gets hashed and sent directly to sql
    }
}