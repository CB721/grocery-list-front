const sqlDB = require("../sql_connection");
const storeTable = "stores";
const userStoreTable = "user_stores";
const checkStore = require("../validation/checkStore");
const { Store } = require("../mongoose_models");

module.exports = {
    addStore: function (req, res) {
        const store = req.body;
        // check that all values are complete
        checkStore(store)
            .then()
            .catch(err => {
                return res.status(400).send(err.message)
            });
        // prevent injections
        const id = sqlDB.escape(store.id);
        const name = sqlDB.escape(store.name);
        const address = sqlDB.escape(store.address);
        const user_id = sqlDB.escape(store.user_id);
        if (address.indexOf("$") > -1) {
            return res.status(406).send("Invalid store address");
        }
        else if (id.indexOf("$") > -1) {
            return res.status(406).send("Invalid store id");
        }
        else if (name.indexOf("$") > -1) {
            return res.status(406).send("Invalid store name");
        }
        else {
            // check if store (address) already exists in mongo
            Store
                .find({ address: address })
                .then(response => {
                    // update total in mongo
                    if (response.length > 0) {
                        let mongoID = response[0]._id;
                        let total = response[0].total_items + 1;
                        Store
                            .findOneAndUpdate({ _id: mongoID }, { $set: { total_items: total } })
                            .then(response => {
                                // if it is in mongo, it has already been added to sql
                                assignToUser();
                            })
                            .catch(err => res.status(422).json(err));
                    } else {
                        addToMongo();
                    }
                })
        }
        // add to mongo
        let addToMongo = function () {
            Store
                .create({
                    address: address,
                    name: name,
                    total_items: 1
                })
                .then(response => {
                    addToSQL();
                })
                .catch(err => res.status(422).json(err));
        }
        // add to sqldb
        let addToSQL = function () {
            let columns = "(id, address, name)";
            sqlDB
                .query(`INSERT INTO ${storeTable} ${columns} VALUES(${id}, ${address}, ${name});`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            assignToUser();
                        }
                    })
        }
        // assign store to user
        let assignToUser = function () {
            let columns = "(store_id, user_id)";
            sqlDB
                .query(`INSERT INTO ${userStoreTable} ${columns} VALUES(${id}, ${user_id});`,
                    function (err, results) {
                        if (err) {
                            return res.status(422).send(err);
                        } else {
                            return res.status(200).json(results);
                        }
                    })
        }
    },
    getUserStores: function (req, res) {
        const ID = sqlDB.escape(req.params.id);
        const query = `CALL get_user_stores(${ID});`;
        sqlDB
            .query(query,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results[0]);
                    }
                });
    },
    deleteUserStore: function (req, res) {
        const ID = sqlDB.escape(req.params.id);
        sqlDB
            .query(`DELETE FROM ${userStoreTable} WHERE id = ${ID};`,
                function (err, results) {
                    if (err) {
                        return res.status(422).send(err);
                    } else {
                        return res.status(200).json(results);
                    }
                });
    },
    getStoreCount: function(req, res) {
        Store
            .countDocuments({})
            .then(total => res.status(200).json(total))
            .catch(err => res.status(422).send(err));
    }
}