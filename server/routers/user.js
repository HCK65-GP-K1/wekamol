const express = require("express");
const Controller = require("../controllers/controller");
const user = express.Router();

user.get("/", Controller.ehehe); //forMockTesting
user.post("/login", Controller.login);
user.post("/register", Controller.register);

user.put("/me");

module.exports = user;
