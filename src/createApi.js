const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {signUp} = require("./routes/signUp");
const {signUpValidation} = require("./validation/signUpValidation");
const {signIn} = require("./routes/signIn");
const {discoverMovies} = require("./routes/discoverMovies");
const {addMovieList} = require("./routes/addMovieList");
const {validateUser} = require("./validation/validateUser");
const {validateMovieList} = require("./validation/validateMovieList");
const {getUser} = require("./routes/getUser.js");
const {getMovielists} = require("./routes/getMovielists");
const {addToMovielist} = require("./routes/addToMovielist");
const {deleteMovies} = require("./routes/deleteMovies");
const {deleteMovielist} = require("./routes/deleteMovielist");
const {searchMovies} = require("./routes/searchMovies");
const {getPublicMovielists} = require("./routes/getPublicMovielists");
const {addCustomizedData} = require("./routes/addCustomizedData");


function createApi({store}){
	api.use(cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization"]
	}));
	api.use(bodyParser.json());



	api.get("/discover-movies", discoverMovies({store}));
	api.get("/search-movies", searchMovies({store}));
	api.get("/get-user", validateUser({jwt}), getUser({store}));
	api.get("/get-movielists", validateUser({jwt}), getMovielists({store}));
	api.get("/get-public-movielists", getPublicMovielists({store}));

	api.post("/sign-up", signUpValidation, signUp({store}));
	api.post("/sign-in", signIn({jwt, store}));
	api.post("/add-movie-list", validateUser({jwt}), validateMovieList, addMovieList({store}));
	api.post("/add-to-movielist", validateUser({jwt}), addToMovielist({store}));
	api.post("/add-customized-data", validateUser({jwt}), addCustomizedData({store}));

	api.delete("/delete-movies", validateUser({jwt}), deleteMovies({store}));
	api.delete("/delete-movielist", validateUser({jwt}), deleteMovielist({store}));

	return api;
}


module.exports = {createApi};
