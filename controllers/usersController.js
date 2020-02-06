const sqlDB = require("../sql_connection");
const { User } = require("../mongoose_models");
const checkPass = require("../validation/checkPass");
const bcrypt = require("bcryptjs");
const table = "uzzdv3povs4xqnxc.users";

module.exports = {
    createUser: function (req, res) {
        const newUser = req.body;
        // check if password is at least 8 characters
        if (!checkPass(newUser.password)) {
            return res.status(400).send("Password must be at least 8 characters");
        }
        // check for mongo injection
        if (newUser.email.indexOf("$") > -1) {
            return res.status(406).send("Invalid email");
        } else {
            // check if email already exists - mongo
            User
                .find({ email: newUser.email })
                .then(response => {
                    if (response.length > 0) {
                        return res.status(400).send("Email already exists");
                    }
                })
                .catch(err => console.log(err));
        }
        // hash user password
        let corbato = function (resistance, id) {
            return new Promise(function (resolve, reject) {
                resolve(
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(resistance, salt, (err, hash) => {
                            if (err) throw err;
                            completeUser(hash, id);
                        });
                    })
                )
            })
        }
        if (newUser.email.indexOf("$") > -1) {
            return res.status(406).send("Invalid email");
        } else {
            // create user in mongo
            // only email is saved in mongo
            User
                .create({ email: newUser.email })
                .then(response => {
                    // get id from mongo
                    let id = response.id;
                    // check if all user fields are complete
                    if (newUser.first_name == undefined ||
                        newUser.last_name == undefined ||
                        newUser.password == undefined ||
                        newUser.email == undefined) {
                        return res.status(400).send("Complete all fields before continuing")
                    } else {
                        // password gets hashed and sent directly to sql
                        corbato(newUser.password, id)
                            .then()
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => res.status(422).json(err));
        }
        // transfer id, email, to sql
        let completeUser = function (pass, identity) {
            let columns = "(id, first_name, last_name, email, user_password, last_visit, joined)";
            const first = sqlDB.escape(newUser.first_name);
            const last = sqlDB.escape(newUser.last_name);
            const email = sqlDB.escape(newUser.email);
            const id = sqlDB.escape(identity);
            const password = sqlDB.escape(pass);
            sqlDB
                .query(`INSERT INTO ${table} ${columns} VALUES(${id}, ${first}, ${last}, ${email}, ${password}, NOW(), NOW());`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            return res.status(200).json(results);
                        }
                    });
        }
    },
    deleteUser: function (req, res) {
        // get id
        let id = req.params.id;
        // prevent injections
        if (id.indexOf("$") > -1) {
            return res.status(406).send("Invalid user id");
        }
        id = sqlDB.escape(identity);

        // delete from mongo
        User
            .findById({ _id: req.params.id })
            .then(response => {
                response.remove();
                deleteSQL();
            })
            .catch(err => res.status(422).send(err));
        // delete in sql
        let deleteSQL = function() {
            sqlDB
                .query(`DELETE * FROM ${table} WHERE id = ${id};`,
                function(err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results);
                    }
                })
        }
    }
}