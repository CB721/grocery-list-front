const router = require("express").Router();
const controller = require("../../controllers/usersController");

router
    .route("/create")
    .post(controller.createUser);
router
    .route("/delete/:id")
    .delete(controller.deleteUser);
router
    .route("/update/:id")
    .put(controller.updateUser);

module.exports = router;