const sqlDB = require("../sql_connection");
const { User } = require("../mongoose_models");
const resetTable = "password_reset_requests";
const userTable = "users";
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'invite.glist@gmail.com',
        pass: process.env.NODEMAILER
    }
});
const resetEmail = require("../templates/passwordReset");
const { isEmail } = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
    createReset: function (req, res) {
        // prevent injections
        if (req.body.email.indexOf("$") > -1 || !isEmail(req.body.email)) {
            return res.status(406).send("Invalid email");
        } else {
            // check email exists
            User
                .find({ email: req.body.email })
                .then(response => {
                    if (response.length > 0) {
                        // create a temp password
                        const tempPassword = crypto.randomBytes(8).toString('hex');
                        // encrypt temp password
                        corbato(tempPassword)
                            .then(hashedPassword => {
                                // create reset request
                                // resetRequest(response[0].id, hashedPassword);
                                checkPastReset(response[0].id, hashedPassword);
                            })
                    } else {
                        return res.status(404).send("Email not on file");
                    }
                })
                .catch(err => {
                    return res.status(500).send(err + " error checking mongo for user");
                });
        }
        // check if a request has already been sent in the past 24 hours
        function checkPastReset(id, password) {
            // db will return all requests for specified user within the past 24-hours where the password has not been updated, instruct user to check their email
            sqlDB
                .query(`CALL check_pass_reset_requests('${id}')`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else if (results[0].length > 0) {
                            // if any are returned, a request has already been placed
                            return res.status(418).send("A request has already been made for this email address in the last 24-hours.  Please check your email for the reset link.");
                        } else {
                            resetRequest(id, password);
                        }
                    })
        }
        function resetRequest(id, password) {
            sqlDB
                .query(`INSERT INTO ${resetTable} (user_id, temp_password) VALUES('${id}', '${password}');`,
                    function (err, results) {
                        if (err) {
                            return res.status(500).send(err);
                        } else if (results.affectedRows === 1) {
                            sendResetEmail();
                        }
                    })
        }
        // hash user password
        let corbato = function (resistance) {
            return new Promise(function (resolve, reject) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(resistance, salt, (err, hash) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(hash);
                        }
                    });
                });
            })
        }
        function sendResetEmail() {
            // set up mail options
            const mailOptions = {
                from: 'invite.glist@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: `G-List Password Reset`, // Subject line
                html: resetEmail(req.body.email),// plain text body,
                priority: "normal"
            };
            // send mail to specified address
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    return res.status(406).send(err.response);
                else
                    if (info.rejected.length > 0) {
                        return res.status(403).send("Email blocked");
                    } else {
                        return res.status(200).send("Password reset sent");
                    }
            });
        }
    }
}