const router = require("express").Router();
const controller = require("../../controllers/listsController");

router
    .route("/add")
    .post(controller.addItem);
router
    .route("/user/:id")
    .get(controller.getCurrentUserList);
router
    .route("/user/item/:id")
    .put(controller.updateItem);
router
    .route("/user/item/remove/:id")
    .delete(controller.removeItem);
router
    .route("/user/full/single")
    .get(controller.getListByID);
router
    .route("/user/full/all")
    .post(controller.getListsByUserID);

module.exports = router;