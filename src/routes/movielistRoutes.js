const express = require("express");
const router = express.Router();
const movielistController = require("@controller/movielist");
const authUser = require("@middleware/authUser");


router.post("/add-movielist", authUser, movielistController.createMovielist);
router.post("/add-movie", authUser, movielistController.addMovie);
router.get("/get-movielists", authUser, movielistController.getMovielists);
router.delete("/remove-movie", authUser, movielistController.removeMovie);
router.patch("/update-settings", authUser, movielistController.updateSettings);
router.delete("/remove-movielist", authUser, movielistController.removeMovielist);
router.get("/get-latest-movielists", movielistController.getLatestMovielists);


module.exports = router;
