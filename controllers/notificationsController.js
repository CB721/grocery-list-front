const sqlDB = require("../sql_connection");
const table = "uzzdv3povs4xqnxc.notifications";

module.exports = {
    getAllByUserID: function (req, res) {
        // prevent injections
        const userID = sqlDB.escape(req.params.user_id);
        sqlDB
            .query(`SELECT * FROM ${table} WHERE user_id = ${userID};`,
            function(err, results) {
                if (err) {
                    return res.status(404).send(err);
                } else {
                    return res.status(200).json(results);
                }
            })
    }
}