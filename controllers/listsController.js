const sqlDB = require("../sql_connection");
const listTable = "uzzdv3povs4xqnxc.lists";
const listItemsTable = "uzzdv3povs4xqnxc.list_items";
const notificationsTable = "uzzdv3povs4xqnxc.notifications";

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
        let date = " ";
        // if item is being purchased
        if (column === "purchased" && value === "true") {
            // add to column and value
            date = ", date_purchased = NOW()";
        } else if (column === "purchased" && value === "false") {
            date = `, date_purchased = ${null}`;
        }
        sqlDB
            .query(`UPDATE ${listItemsTable} SET ${column} = ${value}${date} WHERE id = ${ID};`,
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
        // prevent injections
        // list id is the id of the list being added to the current list
        const list_id = sqlDB.escape(req.body.list_id);
        const user_id = sqlDB.escape(req.body.user_id);
        // check if any values are null
        if (!list_id || !user_id) {
            return res.status(400).send("Missing field");
        }
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
                                // pass current id along with amount of items for positioning
                                getPreviousList(results[0].id, results.length);
                            }
                        }
                    });
        }
        getCurrentList();
        let getPreviousList = function (currID, resLen) {
            sqlDB
                .query(`SELECT * FROM ${listItemsTable} WHERE list_id = ${list_id};`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else {
                            // send results with current list id
                            addPrevListToCurrent(currID, resLen, results);
                        }
                    })
        }

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
        let addPrevListToCurrent = function (currID, resLen, itemsArr) {
            // check if anything is in the previous list
            if (itemsArr.length > 0) {
                const columns = "(date_added, list_id, name, store_id, position, priority)";
                let queryStr = `INSERT INTO ${listItemsTable} ${columns} VALUES`;
                // loop through items
                for (let i = 0; i < itemsArr.length; i++) {
                    // add each item's info to the string
                    // default date added to current time
                    // place additional items at the end of the current list
                    // default priority to Normal
                    queryStr += `(NOW(), ${currID}, '${itemsArr[i].name}', '${itemsArr[i].store_id}', ${resLen + i + 1}, 'Normal'), `;
                }
                // remove last comma and space from string
                queryStr = queryStr.substring(0, queryStr.length - 2);
                // add semicolon to string
                queryStr += ";";
                sqlDB
                    .query(queryStr,
                        function (err, results) {
                            if (err) {
                                return res.status(422).send(err);
                            } else {
                                if (results.affectedRows > 0) {
                                    return res.status(200).json({ status: "success" });
                                } else {
                                    return res.status(500).send("Error with database, nothing added");
                                }
                            }
                        });
            } else {
                return res.status(404).send("Nothing is previous list");
            }
        }
    },
    deleteList: function (req, res) {
        // prevent injections
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
    },
    getSentLists: function(req, res) {
        // prevent injections
        const user_id = sqlDB.escape(req.params.userid);
        const other_user_id = sqlDB.escape(req.params.otheruserid);
        if (!user_id || !other_user_id) {
            return res.status(400).send("No user or other user id provided");
        }
        sqlDB
            .query(`CALL get_sent_lists(${user_id}, ${other_user_id});`,
            function(err, results) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.status(200).json(results[0]);
                }
            })
    }
}
