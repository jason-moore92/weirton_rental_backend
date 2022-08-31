const express = require("express");
const router = express.Router();
const HouseholdController = require("../controllers/household.controller");
const passport = require("passport");

router.post(
  "/new",
  HouseholdController.addNew
);

router.get(
  "/getAllHomes",
  HouseholdController.getAllHomes
);

router.post(
  "/updateHome",
  HouseholdController.updateHome
);

router.post(
  "/addHome",
  HouseholdController.addNewHome
);

router.post(
  "/deleteHome",
  HouseholdController.deleteHome
);


module.exports = router;
