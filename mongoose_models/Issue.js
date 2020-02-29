const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    code: {
        type: Number
    },
    content: {
        type: String
    },
    action: {
        type: String,
        required: true
    },
    front_end: {
        type: Boolean,
        required: true
    },
    back_end: {
        type: Boolean,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;