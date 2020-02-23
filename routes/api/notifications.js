const router = require("express").Router();
const controller = require("../../controllers/notificationsController");

router
    .route("/:user_id")
    .get()

module.exports = router;