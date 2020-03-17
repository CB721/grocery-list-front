const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    error_code: {
        type: Number
    },
    error_message: {
        type: String
    },
    // what triggered the error to occur
    action_trigger: {
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