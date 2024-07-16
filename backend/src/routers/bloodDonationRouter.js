const express = require("express");
const bloodDonationRouter = express.Router();

const { getBloodDonors } = require("../controllers/bloodDonationController");

bloodDonationRouter.get("/getBloodDonors", getBloodDonors);

module.exports = bloodDonationRouter;

