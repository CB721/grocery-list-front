const sqlDB = require("../sql_connection");
const table = "notifications";

module.exports = {
    getAllByUserID: function (req, res) {
        // prevent injections
        const userID = sqlDB.escape(req.params.user_id);
        sqlDB
            .query(`CALL get_user_notifications(${userID});`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else {
                    return res.status(200).json(results[0]);
                }
            })
    },
    deleteByID: function(req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`DELETE FROM ${table} WHERE id = ${ID};`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else if (results.affectedRows === 1) {
                    return res.status(200).send("success");
                } else {
                    return res.status(404).send("None found");
                }
            });
    },
    updateByID: function(req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        // the only update to a notification would be marking it as read
        sqlDB
            .query(`UPDATE ${table} SET acknowledged = 1 WHERE id = ${ID};`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else if (results.affectedRows === 1) {
                    return res.status(200).send("success");
                } else {
                    return res.status(404).send("None found");
                }
            });
    },
    createNotification: function(req, res) {
        const update = req.body;
        let columns = "(date_added, ";
        let values = "(NOW(), ";
        for (let [key, value] of Object.entries(update)) {
            // check for a valid column
            if (key === "user_id" || key === "other_user_id") {
                columns += `${key}, `;
                values += `${sqlDB.escape(value)}, `;
            }
            // if there is a list_id, create appropriate content
            if (key === "list_id") {
                columns += `${key}, content, `;
                values += `${sqlDB.escape(value)}, 'You were sent a list!', `;
            }
        }
        columns = columns.substring(0, columns.length - 2) + ")";
        values = values.substring(0, values.length - 2) + ")";
        sqlDB
            .query(`INSERT INTO ${table} ${columns} VALUES ${values};`,
            function(err, results) {
                if (err) {
                    if (err.sqlMessage.includes("foreign key constraint fails")) {
                        return res.status(404).send("Invalid list id");
                    } else {
                        return res.status(500).send(err);
                    }
                } else if (results.affectedRows === 1) {
                    return res.status(200).send("success");
                }
            })
    }
}