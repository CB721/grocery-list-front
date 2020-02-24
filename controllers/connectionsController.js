const sqlDB = require("../sql_connection");
const table = "uzzdv3povs4xqnxc.connections";

module.exports = {
    getUserConnections: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`CALL get_user_connections(${ID});`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else {
                    return res.status(200).json(results[0]);
                }
            });
    },
    updateConnection: function(req, res) {
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
            .query(`UPDATE ${table} SET ${updateItems} WHERE id = ${ID};`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else if (results.affectedRows > 0) {
                    return res.status(200).send("success");
                } else {
                    return res.status(404).send("nothing updated");
                }
            });
    }
}