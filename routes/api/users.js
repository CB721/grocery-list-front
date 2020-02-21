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
router
    .route("/login")
    .post(controller.getUserByEmail);
router
    .route("/verify/:token/:ip")
    .get(controller.verifyUser);

module.exports = router;