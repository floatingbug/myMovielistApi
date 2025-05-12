const express = require("express");
const router = express.Router();
const movielistController = require("../controller/movielist");
const authUser = require("../middleware/authUser");


router.post("add-movielist", authUser, movielistController.createMovielist);
router.post("add-movie", authUser, movielistController.addMovie);
router.get("get-movielists", authUser, movielistController.getMovielists);


module.exports = router;
