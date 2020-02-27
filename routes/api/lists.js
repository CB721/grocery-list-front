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
    .route("/user/full/single/:id/:userid")
    .get(controller.getListByID)
    .delete(controller.deleteList);
router
    .route("/user/full/all")
    .post(controller.getListsByUserID);
router
    .route("/user/info/update")
    .put(controller.updateList);
router
    .route("/user/previous")
    .post(controller.addPreviousListToCurrent);
router
    .route("/multiple/:userid/:otheruserid")
    .get(controller.getSentLists);

module.exports = router;