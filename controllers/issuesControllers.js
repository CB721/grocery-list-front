const { Issue } = require("../mongoose_models");
const { frontEnd, backEnd } = require("../utilities/createIssue");

module.exports = {
    frontEnd: function (req, res) {
        const issue = req.body;
        issue["front_end"] = true;
        issue["back_end"] = false;
        frontEnd(issue)
            .then(response => res.status(200).send(response))
            .catch(err => res.status(500).send(err));
    },
    backEnd: function (req, res) {
        const issue = req.body;
        issue["front_end"] = false;
        issue["back_end"] = true;
        backEnd(issue)
            .then(response => res.status(200).send(response))
            .catch(err => res.status(500).send(err));
    },
    getAll: function (req, res) {
        Issue
            .find({})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                backEnd({
                    error_code: err.code,
                    error_message: err.name,
                    action_trigger: "get all errors request"
                })
                .then(response => {
                    const trouble = ["get all errors request", response];
                    return res.status(500).json(trouble);
                })
                .catch(errError => {
                    const trouble = [errError, err];
                    return res.status(500).json(trouble);
                });
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
                backEnd({
                    error_code: err.code,
                    error_message: err.name,
                    action_trigger: "get all front end errors request"
                })
                .then(response => {
                    const trouble = ["get all front end errors request", response];
                    return res.status(500).json(trouble);
                })
                .catch(errError => {
                    const trouble = [errError, err];
                    return res.status(500).json(trouble);
                });
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
                backEnd({
                    error_code: err.code,
                    error_message: err.name,
                    action_trigger: "get all back end errors request"
                })
                .then(response => {
                    const trouble = ["get all front end errors request", response];
                    return res.status(500).json(trouble);
                })
                .catch(errError => {
                    const trouble = [errError, err];
                    return res.status(500).json(trouble);
                });
            });
    }
}