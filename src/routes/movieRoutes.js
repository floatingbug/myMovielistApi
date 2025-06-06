const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");
const authUser = require("../middleware/authUser");


router.get("/latest-movies", movieController.getLatestMovies);
router.get("/", authUser, movieController.getMovies);
router.get("/get-by-id", authUser, movieController.getMovieById);
router.get("/get-genre-list", movieController.getGenreList);


module.exports = router;
