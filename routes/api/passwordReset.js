const router = require("express").Router();
const controller = require("../../controllers/passwordResetController");

router
    .route("/request")
    .post(controller.createReset);

module.exports = router;