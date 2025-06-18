const express = require("express");
const router = express.Router();
const movieRoutes = require("./movieRoutes");
const movielistRoutes = require("./movielistRoutes");
const watchlistRoutes = require("./watchlistRoutes");
const ratingRoutes = require("./ratingRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");


router.use("/movie", movieRoutes);
router.use("/movielist", movielistRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/rating", ratingRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);


module.exports = router;
