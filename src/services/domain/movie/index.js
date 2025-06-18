const getLatestMovies = require("./getLatestMovies");
const getMovies = require("./getMovies");
const getMovieById = require("./getMovieById");
const getGenreList = require("./getGenreList");
const getMoviesByIds = require("./getMoviesByIds");
const getMoviesByPerson = require("./getMoviesByPerson");


module.exports = {
	getMovies,
	getMovieById,
	getGenreList,
	getMoviesByIds,
	getLatestMovies,
	getMoviesByPerson,
};
