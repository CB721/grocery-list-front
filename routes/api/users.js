const router = require("express").Router();
const controller = require("../../controllers/usersController");

router
    .route("/create")
    .post(controller.createUser);

module.exports = router;