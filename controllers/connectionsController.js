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
    }
}