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

module.exports = {
    createReset: function (req, res) {
        // prevent injections
        const email = sqlDB.escape(req.body.email);
        console.log(email);
        // check email exists
        User
            .find({ email: email })
            .then(response => {
                if (response.length > 0) {
                    // create a temp password
                    const tempPassword = crypto.randomBytes(8).toString('hex');
                    // encrypt temp password
                    corbato(tempPassword)
                        .then(hashedPassword => {
                            // create reset request
                            resetRequest(response.id, hashedPassword);
                        })
                } else {
                    return res.status(404).send("No user with that email");
                }
            })
            .catch(err => {
                return res.status(500).send(err);
            });
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
                to: email, // list of receivers
                subject: `G-List Password Reset`, // Subject line
                html: resetEmail(email),// plain text body,
                priority: "normal"
            };
            // send mail to specified address
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    return res.status(503).send(err);
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