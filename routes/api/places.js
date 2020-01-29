const router = require("express").Router();
const controller = require("../../controllers/placesController");

router
    .route("/")
    .post(controller.getUserPlace);

module.exports = router;