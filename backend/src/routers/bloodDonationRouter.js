const express = require("express");
const bloodDonationRouter = express.Router();

const { getBloodDonors, updateDonationStatus } = require("../controllers/bloodDonationController");

bloodDonationRouter.get("/getBloodDonors", getBloodDonors);
bloodDonationRouter.post('/:userId/updateDonationStatus', updateDonationStatus);

module.exports = bloodDonationRouter;

