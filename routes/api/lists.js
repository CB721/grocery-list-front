const router = require("express").Router();
const controller = require("../../controllers/listsController");

router
    .route("/add")
    .post(controller.addItem);
router
    .route("/user/:id")
    .get(controller.getUserList);

module.exports = router;