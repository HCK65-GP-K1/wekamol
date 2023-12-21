const express = require("express");
const router = express.Router();
const user = require("./user");
const Controller = require("../controllers/controller");

router.get("/", Controller.ehehe);

router.get("/leaderboard", Controller.leaderBoard);

router.use("/users", user);


module.exports = router;
