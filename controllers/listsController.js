const sqlDB = require("../sql_connection");
const listTable = "uzzdv3povs4xqnxc.lists";
const listItemsTable = "uzzdv3povs4xqnxc.list_items";

module.exports = {
    addItem: function (req, res) {
        // prevent injections
        const name = sqlDB.escape(req.body.name);
        const user_id = sqlDB.escape(req.body.user_id);
        const store_id = sqlDB.escape(req.body.store_id);
        const position = sqlDB.escape(req.body.position);
        // find current list
        let getCurrentList = function () {
            sqlDB
                .query(`SELECT * FROM ${listTable} WHERE user_id = ${user_id};`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            if (results.length < 1) {
                                // if no lists, create a new list
                                createList();
                            }
                            // if completed, create a new list
                            if (results.completed > 0) {
                                createList();
                            } else {
                                addItemToList(results[0].id);
                            }
                        }
                    });
        }
        getCurrentList();

        // create list
        let createList = function () {
            const columns = "(date_added, user_id)"
            sqlDB
                .query(`INSERT INTO ${listTable} ${columns} VALUES (NOW(), ${user_id});`,
                    function (err) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            getCurrentList();
                        }
                    });
            // console.log("create list");
        }
        // add item to list
        let addItemToList = function(id) {
            const columns = "(date_added, list_id, name, store_id, position)";
            sqlDB
                .query(`INSERT INTO ${listItemsTable} ${columns} VALUES (NOW(), ${id}, ${name}, ${store_id}, ${position});`,
                function(err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results);
                    }
                });
        }
    }
}
