const path = require("path");
const router = require("express").Router();
const places = require("./places");
const users = require("./users");
const stores = require("./stores");
const lists = require("./lists");
const notifications = require("./notifications");

router.use("/places", places);
router.use("/users", users);
router.use("/stores", stores);
router.use("/lists", lists);
router.use("/notifications", notifications);

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;