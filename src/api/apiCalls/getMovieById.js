const {fetchFromApi} = require("../utils/fetchFromApi");


async function getMovieById(movieId){
	const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: process.env.API_TOKEN
		  }
	  };

	const result = await fetchFromApi(url, options);

	if(!result.original_title) throw new Error("Movie not found");

	return result;
}


module.exports = {getMovieById};
