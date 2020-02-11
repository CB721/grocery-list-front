const router = require("express").Router();
const controller = require("../../controllers/listsController");

router
    .route("/add")
    .post(controller.addItem);

module.exports = router;