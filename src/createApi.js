const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {signUp} = require("./routes/signUp");
const {signUpValidation} = require("./validation/signUpValidation");
const {signIn} = require("./routes/signIn");
const {findMovies} = require("./routes/findMovies");

function createApi({store}){
	api.use(cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization"]
	}));
	api.use(bodyParser.json());



	api.get("/find-movies", findMovies({store}));

	api.post("/sign-up", signUpValidation, signUp({store}));
	api.post("/sign-in", signIn({jwt, store}));

	return api;
}


module.exports = {createApi};
