const sqlDB = require("../sql_connection");
const table = "uzzdv3povs4xqnxc.notifications";

module.exports = {
    getAllByUserID: function (req, res) {
        console.log(req.params.user_id);
    }
}