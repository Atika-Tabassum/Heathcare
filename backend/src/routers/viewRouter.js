const express = require("express");
const viewRouter = express.Router();

const { getCamps,getNotifications,getCampDetails,getResponse } = require("../controllers/viewController");

viewRouter.get("/:userId/org_camps", getCamps);
viewRouter.get("/:userId/notifications", getNotifications);
viewRouter.get("/:campId/camp_details", getCampDetails);
viewRouter.get("/:userId/:campId/:select/response", getResponse);

module.exports = viewRouter;