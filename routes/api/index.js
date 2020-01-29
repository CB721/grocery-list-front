const path = require("path");
const router = require("express").Router();
const places = require("./places");

router.use("/places", places);
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;