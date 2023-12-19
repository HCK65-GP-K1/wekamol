const express = require("express");
const Controller = require("../controllers/controller");
const user = express.Router();

user.get("/", Controller.ehehe); //forMockTesting
user.get("/checkuser");
user.put("/me");

module.exports = user;
