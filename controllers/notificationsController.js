const sqlDB = require("../sql_connection");
const table = "uzzdv3povs4xqnxc.notifications";

module.exports = {
    getAllByUserID: function (req, res) {
        // prevent injections
        const userID = sqlDB.escape(req.params.user_id);
        sqlDB
            .query(`SELECT * FROM ${table} WHERE user_id = ${userID} ORDER BY date_added DESC LIMIT 10;`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else {
                    return res.status(200).json(results);
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
    }
}