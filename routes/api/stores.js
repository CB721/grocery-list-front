const router = require("express").Router();
const controller = require("../../controllers/storesControllers");

router
    .route("/add")
    .post(controller.addStore);
router
    .route("/user/:id")
    .get(controller.getUserStores);
router
    .route("/user/delete/:id")
    .delete(controller.deleteUserStore);
router
    .route("/count")
    .get(controller.getStoreCount);

module.exports = router;