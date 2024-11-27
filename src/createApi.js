const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {signUp} = require("./routes/signUp");
const {signUpValidation} = require("./validation/signUpValidation");
const {signIn} = require("./routes/signIn");
const {findMovies} = require("./routes/findMovies");
const {addMovieList} = require("./routes/addMovieList");
const {validateUser} = require("./validation/validateUser");
const {validateMovieList} = require("./validation/validateMovieList");
const {getUser} = require("./routes/getUser.js");
const {getMovielists} = require("./routes/getMovielists");
const {addToMovielist} = require("./routes/addToMovielist");
const {deleteMovies} = require("./routes/deleteMovies");

function createApi({store}){
	api.use(cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization"]
	}));
	api.use(bodyParser.json());



	api.get("/find-movies", findMovies({store}));
	api.get("/get-user", validateUser({jwt}), getUser({store}));
	api.get("/get-movielists", validateUser({jwt}), getMovielists({store}));

	api.post("/sign-up", signUpValidation, signUp({store}));
	api.post("/sign-in", signIn({jwt, store}));
	api.post("/add-movie-list", validateUser({jwt}), validateMovieList, addMovieList({store}));
	api.post("/add-to-movielist", validateUser({jwt}), addToMovielist({store}));

	api.delete("/delete-movies", validateUser({jwt}), deleteMovies({store}));

	return api;
}


module.exports = {createApi};
