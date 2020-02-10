const router = require("express").Router();
const controller = require("../../controllers/storesControllers");

router
    .route("/add")
    .post(controller.addStore);
router
    .route("/user/:id")
    .get(controller.getUserStores);

module.exports = router;