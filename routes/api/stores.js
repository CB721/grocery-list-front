const router = require("express").Router();
const controller = require("../../controllers/storesControllers");

router
    .route("/add")
    .post(controller.addStore);

module.exports = router;