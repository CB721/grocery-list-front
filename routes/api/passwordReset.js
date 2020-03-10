const router = require("express").Router();
const controller = require("../../controllers/passwordResetController");

router
    .route("/request")
    .post(controller.createReset);
router
    .route("/new/update")
    .post(controller.updatePassword);

module.exports = router;