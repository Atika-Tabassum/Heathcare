const express = require("express");
const contentsRouter = express.Router();

const { getContents } = require("../controllers/contentsController");

contentsRouter.get("/", getContents);

module.exports = contentsRouter;