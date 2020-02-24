const router = require("express").Router();
const controller = require("../../controllers/connectionsController");

router
    .route("/:id")
    .get(controller.getUserConnections);

module.exports = router;