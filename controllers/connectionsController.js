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
const { backEnd, frontEnd } = require("../utilities/createIssue");

module.exports = {
    getUserConnections: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`CALL get_user_connections(${ID});`,
                function (err, results) {
                    if (err) {
                        backEnd({
                            error_code: err.code,
                            error_message: err.sqlMessage,
                            action_trigger: "get all user connections"
                        })
                            .then(() => {
                                return res.status(404).json(err);
                            })
                            .catch(() => {
                                return res.status(404).json(err);
                            });
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
        if (!updateItems) {
            const issue = req.body;
            issue["action_trigger"] = "invalid columns";
            frontEnd(issue)
                .then(() => res.status(400).send("invalid columns"))
                .catch(() => res.status(400).send("invalid columns"));
        }
        updateItems = updateItems.substring(0, updateItems.length - 2);
        sqlDB
            .query(`UPDATE ${connectTable} SET ${updateItems} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        backEnd({
                            error_code: err.code,
                            error_message: err.sqlMessage,
                            action_trigger: `update connection.  connection id: ${ID}`
                        })
                            .then(() => {
                                return res.status(404).json(err);
                            })
                            .catch(() => {
                                return res.status(404).json(err);
                            });
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
                        backEnd({
                            error_code: err.code,
                            error_message: err.sqlMessage,
                            action_trigger: `remove connection. id: ${ID}`
                        })
                            .then(() => {
                                return res.status(400).json(err);
                            })
                            .catch(() => {
                                return res.status(404).json(err);
                            });
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
            frontEnd({
                error_message: "Mongo injection attempt",
                action_trigger: `connection request: ${request}`
            })
                .then(() => {
                    return res.status(400).json(err);
                })
                .catch(() => {
                    return res.status(404).json(err);
                });
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
                    checkExistConnection(response.id);
                } else {
                    // get invite template
                    const template = invite(password, request.email, request.username);
                    // // replace password with unique generated string
                    // template = template.replace("{{password}}", password);
                    // // replace username with name from request
                    // template = template.replace("{{username}}", request.username);
                    // // replace email
                    // template = template.replace("{{email}}", request.email);
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
                        if (err) {
                            backEnd({
                                action_trigger: `send mail error: ${err}`
                            })
                                .then(() => {
                                    return res.status(503).json(err);
                                })
                                .catch(() => {
                                    return res.status(503).json(err);
                                });
                        } else if (info.rejected.length > 0) {
                            backEnd({
                                action_trigger: `email blocked: ${info}`
                            })
                                .then(() => {
                                    return res.status(500).json(err);
                                })
                                .catch(() => {
                                    return res.status(500).json(err);
                                });
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
                            backEnd({
                                action_trigger: `hash user password, connection request: ${err}`
                            })
                                .then(() => {
                                    return reject(err);
                                })
                                .catch(() => {
                                    return reject(err);
                                });
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
                    let id = response.id;
                    corbato(pass)
                        .then(response => {
                            createUserSQL(response, id);
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
                            backEnd({
                                error_code: err.code,
                                error_message: err.sqlMessage,
                                action_trigger: `create user in sql.  connection id: ${ID}, user id: ${id}`
                            })
                                .then(() => {
                                    return res.status(422).json(err);
                                })
                                .catch(() => {
                                    return res.status(422).json(err);
                                });
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
                            backEnd({
                                error_code: err.code,
                                error_message: err.sqlMessage,
                                action_trigger: `check existing connection`
                            })
                                .then(() => {
                                    return res.status(500).json(err);
                                })
                                .catch(() => {
                                    return res.status(500).json(err);
                                });
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
                            backEnd({
                                error_code: err.code,
                                error_message: err.sqlMessage,
                                action_trigger: `create connection`
                            })
                                .then(() => {
                                    return res.status(500).json(err);
                                })
                                .catch(() => {
                                    return res.status(500).json(err);
                                });
                        } else if (results.affectedRows === 1) {
                            // if it successfully added, create a notification for the requested user
                            createNotification(requestedID);
                        } else {
                            backEnd({
                                action_trigger: `unable to create connection`
                            })
                                .then(() => {
                                    return res.status(500).send("Unable to create connection");
                                })
                                .catch(() => {
                                    return res.status(500).send("Unable to create connection");
                                });
                        }
                    })
        }
        // create notification for that user
        function createNotification(requestedID) {
            sqlDB
                .query(`INSERT INTO ${notificationsTable} (content, date_added, user_id, other_user_id) VALUES("You have a connection request!", NOW(), ${ID}, '${requestedID}');`,
                    function (err, results) {
                        if (err) {
                            backEnd({
                                error_code: err.code,
                                error_message: err.sqlMessage,
                                action_trigger: `create notification for connection request`
                            })
                                .then(() => {
                                    return res.status(500).json(err);
                                })
                                .catch(() => {
                                    return res.status(500).json(err);
                                });
                        } else if (results.affectedRows === 1) {
                            return res.status(200).send("Connection request sent");
                        } else {
                            backEnd({
                                action_trigger: `Unable to send connection request`
                            })
                                .then(() => {
                                    return res.status(500).send("Unable to create connection");
                                })
                                .catch(() => {
                                    return res.status(500).send("Unable to create connection");
                                });
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
                        backEnd({
                            error_code: err.code,
                            error_message: err.sqlMessage,
                            action_trigger: `cancel connection request`
                        })
                            .then(() => {
                                return res.status(500).json(err);
                            })
                            .catch(() => {
                                return res.status(500).json(err);
                            });
                    } else if (results.affectedRows === 1) {
                        return res.status(200).send("Connection request cancelled");
                    }
                })
    }
}