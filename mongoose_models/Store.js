const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    total_items: {
        type: Number,
        required: true
    }
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;