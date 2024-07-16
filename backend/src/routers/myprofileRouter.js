const express = require("express");
const myprofileRouter = express.Router();

const { getUser, getChats, getAllChats, getOtherUsers } = require("../controllers/myprofileController");

myprofileRouter.get("/:userId/myprofile", getUser);
myprofileRouter.get("/:userId/:receiverId/chats", getChats);
myprofileRouter.get("/:userId/chats", getAllChats);
myprofileRouter.get("/:userId/otherUsers", getOtherUsers);


module.exports = myprofileRouter;
