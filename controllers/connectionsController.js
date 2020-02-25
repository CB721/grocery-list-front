const sqlDB = require("../sql_connection");
const { User } = require("../mongoose_models");
const connectTable = "uzzdv3povs4xqnxc.connections";
const notificationsTable = "uzzdv3povs4xqnxc.notifications";
const { isEmail } = require("validator");

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
        // check if email exists
        User
            .find({ email: email })
            .then(response => {
                if (response.length > 0) {
                    // if it does, get user id of other user
                    checkExistConnection(response[0]._id);
                } else {
                    // if it does not, send email to person - configure nodemailer for this
                    return res.status(404).send("User does not exist");
                }
            })
            .catch(err => res.status(500).send(err));
        // check if there is row where either the initial user or the requested user
        function checkExistConnection(requestedID) {
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
    }
}