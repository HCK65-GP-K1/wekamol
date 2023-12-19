const express = require("express");
const router = express.Router();
const user = require("./user");
const Controller = require("../controllers/controller");

// const { isLoggedIn } = require("../middleware/authentication");

router.get("/");
router.post("/register");
router.post("/login");
router.post("/login/google");

// router.use("/users", isLoggedIn, user);

module.exports = router;
