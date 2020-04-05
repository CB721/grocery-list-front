const bcrypt = require("bcryptjs");
const { backEnd } = require("./createIssue");

module.exports = {
    corbato: function (resistance) {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(resistance, salt, (err, hash) => {
                    if (err) {
                        backEnd({
                            action_trigger: `hash user password ${err}`
                        })
                            .then(() => {
                                return reject(err);
                            })
                            .catch(() => {
                                return reject(err);
                            });
                    } else {
                        return resolve(hash);
                    }
                });
            });
        })
    }
}