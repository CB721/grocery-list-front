const router = require("express").Router();
const controller = require("../../controllers/issuesControllers");

router
    .route("/front")
    .get(controller.getAllFrontEnd)
    .post(controller.frontEnd);
router
    .route("/back")
    .get(controller.getAllBackEnd)
    .post(controller.backEnd);
router
    .route("/all")
    .get(controller.getAll);

module.exports = router;