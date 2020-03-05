const sqlDB = require("../sql_connection");
const { User } = require("../mongoose_models");
const connectTable = "connections";
const notificationsTable = "notifications";
const usersTable = "users";
const { isEmail } = require("validator");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'invite.glist@gmail.com',
        pass: process.env.NODEMAILER
    }
});
const invite = require("../templates/invite");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
    getUserConnections: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`CALL get_user_connections(${ID});`,
                function (err, results) {
                    if (err) {
                        return res.status(404).send(err);
                    } else {
                        return res.status(200).json(results[0]);
                    }
                });
    },
    updateConnection: function (req, res) {
        // prevent injections
        // id will be the id of the connection, not the user
        const ID = sqlDB.escape(req.params.id);
        const update = req.body;
        let updateItems = "";
        for (let [key, value] of Object.entries(update)) {
            // check for a valid column
            // only the pending and accepted columns would be updated
            if (key === "pending" || key === "accepted") {
                updateItems += `${key} = ${sqlDB.escape(value)}, `;
            }
        }
        updateItems = updateItems.substring(0, updateItems.length - 2);
        sqlDB
            .query(`UPDATE ${connectTable} SET ${updateItems} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(404).send(err);
                    } else if (results.affectedRows > 0) {
                        return res.status(200).send("success");
                    } else {
                        return res.status(404).send("nothing updated");
                    }
                });
    },
    removeConnection: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        // instead of removing connection entirely, just update accepted to be false and pending to be false
        sqlDB
            .query(`UPDATE ${connectTable} SET pending = 0, accepted = 0 WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(404).send(err);
                    } else if (results.affectedRows > 0) {
                        return res.status(200).send("success");
                    } else {
                        return res.status(404).send("nothing updated");
                    }
                });
    },
    connectionRequest: function (req, res) {
        // user would send an email of other user and their id
        const request = req.body;
        const email = request.email;
        // prevent injections
        if (email.indexOf("$") > -1 || !isEmail(email)) {
            return res.status(406).send("Invalid email");
        }
        const ID = sqlDB.escape(request.id);
        // create password for new user
        const password = crypto.randomBytes(8).toString('hex');
        // check if email exists
        User
            .find({ email: email })
            .then(response => {
                if (response.length > 0) {
                    // if it does, get user id of other user
                    checkExistConnection(response[0]._id);
                } else {
                    // get invite template
                    let template = invite();
                    // replace password with unique generated string
                    template = template.replace("{{password}}", password);
                    // replace username with name from request
                    template = template.replace("{{username}}", request.username);
                    // replace email
                    template = template.replace("{{email}}", request.email);
                    // set up mail options
                    const mailOptions = {
                        from: 'invite.glist@gmail.com', // sender address
                        to: email, // list of receivers
                        subject: `${request.username} has inivited you to try G-List!`, // Subject line
                        html: template,// plain text body,
                        priority: "normal"
                    };
                    // send mail to specified address
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err)
                            return res.status(503).send(err);
                        else
                            if (info.rejected.length > 0) {
                                return res.status(403).send("Email blocked");
                            } else {
                                createUserMongo(password);
                                // check sql to see if user has been "created" or not
                                // if they have been created, redirect to login page
                                // if not update user to be created with the user's first and last name
                            }
                    });
                }
            })
            .catch(err => res.status(500).send(err));
        // hash user password
        let corbato = function (resistance) {
            return new Promise(function (resolve, reject) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(resistance, salt, (err, hash) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(hash);
                        }
                    });
                });
            })
        }
        // create user in mongo
        function createUserMongo(pass) {
            User
                .create({ email: email })
                .then(response => {
                    // get id from mongo
                    let id = response[0]._id;
                    corbato(pass)
                        .then(res => {
                            createUserSQL(res, id);
                        })
                        .catch(err => {
                            return res.status(500).send(err);
                        });
                })
                .catch(err => res.status(422).json(err));
        }
        // create user in sql
        let createUserSQL = function (pass, identity) {
            let columns = "(id, first_name, last_name, email, user_password, last_visit, joined, created)";
            const id = sqlDB.escape(identity);
            const password = sqlDB.escape(pass);
            sqlDB
                .query(`INSERT INTO ${usersTable} ${columns} VALUES(${id}, "Grocery", "List", '${email}', ${password}, NOW(), NOW(), FALSE);`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else if (results.affectedRows === 1) {
                            // if a row has successfully been added to the table, create a connection between the newly created user and the existing user
                            // we can skip the check because we know there isn't one because a user was just created
                            createConnection(identity);
                        }
                    });
        }
        // check if there is row where either the initial user or the requested user
        function checkExistConnection(requestedID) {
            // if an email exists in mongo, we can assume one was also created in SQL
            sqlDB
                .query(`SELECT * FROM ${connectTable} WHERE (requestor_id = ${ID} AND requested_id = '${requestedID}') OR (requestor_id = '${requestedID}' AND requested_id = ${ID});`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else if (results.length > 0) {
                            // if there are any results, a connection already exists
                            return res.status(202).send("Connection already exists");
                        } else {
                            // if there are no results, create a new connection
                            createConnection(requestedID);
                        }
                    });
        }
        // create connection row
        function createConnection(requestedID) {
            sqlDB
                .query(`INSERT INTO ${connectTable} (requestor_id, requested_id, date_added) VALUES (${ID}, '${requestedID}', NOW());`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else if (results.affectedRows === 1) {
                            // if it successfully added, create a notification for the requested user
                            createNotification(requestedID);
                        } else {
                            return res.status(500).send("Unable to create connection");
                        }
                    })
        }
        // create notification for that user
        function createNotification(requestedID) {
            sqlDB
                .query(`INSERT INTO ${notificationsTable} (content, date_added, user_id, other_user_id) VALUES("You have a connection request!", NOW(), ${ID}, '${requestedID}');`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else if (results.affectedRows === 1) {
                            return res.status(200).send("Connection request sent");
                        } else {
                            return res.status(500).send("Unable to send connection request");
                        }
                    });
        }
    },
    cancelConnectionRequest: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`DELETE FROM ${connectTable} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(500).send(err);
                    } else if (results.affectedRows === 1) {
                        return res.status(200).send("Connection request cancelled");
                    }
                })
    }
}