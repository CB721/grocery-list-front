const { Issue } = require("../mongoose_models");

module.exports = {
    frontEnd: function (issue) {
        return new Promise((resolve, reject) => {
            issue["front_end"] = true;
            issue["back_end"] = false;
            Issue
                .create(issue)
                .then(response => {
                    if (response) {
                        resolve("Issue successfully saved");
                    } else {
                        reject(new Error("Issue was not saved to db"));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    backEnd: function (issue) {
        return new Promise((resolve, reject) => {
            issue["front_end"] = false;
            issue["back_end"] = true;
            Issue
                .create(issue)
                .then(response => {
                    if (response) {
                        resolve("Issue successfully saved");
                    } else {
                        reject(new Error("Issue was not saved to db"));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
}