const express = require("express");
const ratingRoutes = express.Router();
const ratingController = require("../controller/rating");
const authUser = require("../middleware/authUser");


ratingRoutes.post("/add-rating", authUser, ratingController.createRating);


module.exports = ratingRoutes;
