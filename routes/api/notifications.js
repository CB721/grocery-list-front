const router = require("express").Router();
const controller = require("../../controllers/notificationsController");

router
    .route("/:user_id")
    .get(controller.getAllByUserID);
router
    .route("/single/:id")
    .delete(controller.deleteByID)
    .put(controller.updateByID);
router
    .route("/create")
    .post(controller.createNotification);

module.exports = router;