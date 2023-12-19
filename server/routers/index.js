const express = require("express");
const router = express.Router();
const user = require("./user");
const Controller = require("../controllers/controller");

// const { isLoggedIn } = require("../middleware/authentication");

router.get("/");
router.post("/register", Controller.register);
router.post("/login");

// router.use("/users", isLoggedIn, user);

module.exports = router;
