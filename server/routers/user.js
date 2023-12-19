const express = require("express");
const Controller = require("../controllers/controller");
const { isLoggedIn } = require("../middlewares/auth");
const user = express.Router();

user.get("/", Controller.ehehe); //forMockTesting
user.post("/login", Controller.login);
user.post("/register", Controller.register);
user.get("/profile", isLoggedIn, Controller.getUserProfile);

module.exports = user;
