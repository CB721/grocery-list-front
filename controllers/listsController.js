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
        const priority = sqlDB.escape(req.body.priority);

        // find current list
        let getCurrentList = function () {
            sqlDB
                .query(`SELECT * FROM ${listTable} WHERE user_id = ${user_id} AND lists.completed = false;`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            if (results.length < 1) {
                                // if no lists, create a new list
                                createList();
                            }
                            // if completed, create a new list
                            if (results.completed > 0 || results.length < 1) {
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
        let addItemToList = function (id) {
            sqlDB
                .query(`CALL add_item(${id}, ${name}, ${store_id}, ${position}, ${priority});`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            return res.status(200).json(results);
                        }
                    });
        }
    },
    getCurrentUserList: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        // get current list
        sqlDB
            .query(`SELECT * FROM ${listTable} WHERE user_id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        getFullList();
                    }
                });
        let getFullList = function () {
            sqlDB
                .query(`CALL current_list(${ID});`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            return res.status(200).json(results[0]);
                        }
                    })
        }
    },
    updateItem: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        const update = req.body;
        // would be updating position on list, if it has been purchased or it's priority level
        const column = Object.keys(update)[0];
        const value = sqlDB.escape(update[column]);
        let date;
        // if item is being purchased
        if (column === "purchased" && value === "true") {
            // add to column and value
            date = ", date_purchased = NOW()";
        } else if (column === "purchased" && value === "false") {
            date = `, date_purchased = ${null}`;
        }
        sqlDB
            .query(`UPDATE ${listItemsTable} SET ${column} = ${value} ${date} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        if (results.affectedRows > 0) {
                            return res.status(200).send("Item updated");
                        } else {
                            return res.status(404).send("No item found");
                        }
                    }
                });
    },
    removeItem: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`DELETE FROM ${listItemsTable} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results);
                    }
                });
    },
    getListByID: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.params.userid);
        const list_id = sqlDB.escape(req.params.id);
        sqlDB
            .query(`CALL get_list_by_id(${ID}, ${list_id});`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results[0]);
                    }
                });
    },
    getListsByUserID: function (req, res) {
        // prevent injections
        const ID = sqlDB.escape(req.body.user_id);
        let direction = sqlDB.escape(req.body.direction);
        // remove ' from beginning and end of direction string
        direction = direction.substr(1);
        direction = direction.substr(0, direction.length - 1);
        // default completed to true because this route will mostly be used for retrieving a completed list
        const completed = (sqlDB.escape(req.body.completed || true)) == "true";
        sqlDB
            .query(`SELECT * FROM lists WHERE user_id = ${ID} and completed = ${completed} ORDER BY date_added ${direction};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results);
                    }
                });
    },
    updateList: function (req, res) {
        const update = req.body;
        // grab column name of what is to be updated
        const column = Object.keys(update)[0];
        // prevent injections
        const value = sqlDB.escape(update[column]);
        const userID = sqlDB.escape(req.body.user_id);
        const ID = sqlDB.escape(req.body.list_id);
        sqlDB
            .query(`UPDATE ${listTable} SET ${column} = ${value} WHERE user_id = ${userID} AND id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        if (results.affectedRows > 0) {
                            return res.status(200).send("List updated");
                        } else {
                            return res.status(404).send("No list found");
                        }
                    }
                });
    },
    addPreviousListToCurrent: function (req, res) {
        const list = JSON.parse(req.body.list);
        const user_id = sqlDB.escape(req.body.user_id);
        // check if a list already exists
        // find current list
        let getCurrentList = function () {
            sqlDB
                .query(`SELECT * FROM ${listTable} WHERE user_id = ${user_id} AND lists.completed = false;`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            if (results.length < 1) {
                                // if no lists, create a new list
                                createList();
                            }
                            // if completed, create a new list
                            if (results.completed > 0 || results.length < 1) {
                                createList();
                            } else {
                                addItemToList(results[0].id, results.length);
                            }
                        }
                    });
        }
        getCurrentList();

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
        let addItemToList = function (id, position) {
            const columns = "(date_added, list_id, name, store_id, position, priority)";
            let i = 0;
            // while (i <= list.length) {
            //     console.log(list[i]);
            //     if (i === list.length) {
            //         return res.status(200).send("All items added");
            //     } else {
            //         sqlDB
            //             .query(`INSERT INTO ${listItemsTable} ${columns} VALUES (NOW(), ${list[i].id}, ${list[i].name}, ${list[i].store_id}, ${position + 1}, "Normal");`,
            //                 function (err, results) {
            //                     if (err) {
            //                         return res.status(422).send(err);
            //                     } else {
            //                         if (results.affectedRows > 0) {
            //                             i++;
            //                         } else {
            //                             return res.status(404).send(`${list[i].name} not added`);
            //                         }
            //                     }
            //                 });
            //     }
            // }
        }
    },
    deleteList: function (req, res) {
        // prevent injects
        const ID = sqlDB.escape(req.params.id);
        const userID = sqlDB.escape(req.params.userid);
        sqlDB
            .query(`DELETE FROM ${listTable} WHERE id = ${ID} AND user_id = ${userID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        if (results.affectedRows > 0) {
                            return res.status(200).send("List deleted");
                        } else {
                            return res.status(404).send("No list found");
                        }
                    }
                });
    }
}
