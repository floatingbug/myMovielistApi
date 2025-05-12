const express = require("express");
const router = express.Router();
const watchlistController = require("../controller/watchlist");
const authUser = require("../middleware/authUser");


router.post("/add-movie", authUser, watchlistController.addMovie);


module.exports = router;
