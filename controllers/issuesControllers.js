const { Issue } = require("../mongoose_models");

module.exports = {
    frontEnd: function (req, res) {
        const issue = req.body;
        issue["front_end"] = true;
        issue["back_end"] = false;
        Issue
            .create(issue)
            .then(response => {
                if (response) {
                    return res.status(200).send("error successfully saved");
                } else {
                    return res.status(500).send("Issue not input into db");
                }
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    },
    backEnd: function (req, res) {
        const issue = req.body;
        issue["front_end"] = false;
        issue["back_end"] = true;
        Issue
            .create(issue)
            .then(response => {
                if (response) {
                    return res.status(200).send("error successfully saved");
                } else {
                    return res.status(500).send("Issue not input into db");
                }
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    },
    getAll: function (req, res) {
        Issue
            .find({})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {

            });
    },
    getAllFrontEnd: function (req, res) {
        Issue
            .find({ front_end: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                // save this error to db
                // since it happened on the back end, it is back end error
                // but the action trigger is the front end
                Issue
                    .create({
                        error_code: err.code,
                        error_message: err.name,
                        action_trigger: "get all front end errors request",
                        front_end: false,
                        back_end: true
                    })
                    .then(() => {
                        // send back the error to the user
                        return res.status(500).send(err)
                    })
                    .catch(errError => {
                        return res.status(500).send(errError);
                    })
            });
    },
    getAllBackEnd: function (req, res) {
        Issue
            .find({ back_end: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                // save this error to db
                // since it happened on the back end, it is back end error
                // but the action trigger is the front end
                Issue
                    .create({
                        error_code: err.code,
                        error_message: err.name,
                        action_trigger: "get all back end errors request",
                        front_end: false,
                        back_end: true
                    })
                    .then(() => {
                        // send back the error to the user
                        return res.status(500).send(err)
                    })
                    .catch(errError => {
                        return res.status(500).send(errError);
                    })
            });
    }
}