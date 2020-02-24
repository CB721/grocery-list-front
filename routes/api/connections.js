const router = require("express").Router();
const controller = require("../../controllers/connectionsController");

router
    .route("/:id")
    .get(controller.getUserConnections)
    .put(controller.updateConnection)
    .delete(controller.removeConnection);
router
    .route("/new")
    .post(controller.connectionRequest);


module.exports = router;