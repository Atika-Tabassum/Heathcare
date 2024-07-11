const express = require("express");
const myprofileRouter = express.Router();

const { getUser } = require("../controllers/myprofileController");

myprofileRouter.get("/:userId/myprofile", getUser);

module.exports = myprofileRouter;