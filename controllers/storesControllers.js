const sqlDB = require("../sql_connection");
const table = "uzzdv3povs4xqnxc.stores";
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
            // check if store (id) already exists in sqldb
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
                                console.log(response);
                            })

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
                    console.log(response);
                })
                .catch(err => res.status(422).json(err));
        }
        // add to sqldb
    }
}