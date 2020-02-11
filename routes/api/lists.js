const router = require("express").Router();
const controller = require("../../controllers/listsController");

router
    .route("/add")
    .post(controller.addItem);
router
    .route("/user/:id")
    .get(controller.getUserList);
router
    .route("/user/item/:id")
    .put(controller.updateItem)

module.exports = router;