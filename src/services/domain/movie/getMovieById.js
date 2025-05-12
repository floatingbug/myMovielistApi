const ratingModel = require("@models/rating");
const tmdb = require("@tmdb");


async function getMovieById({movieId}){
	try{
		// get movie
		const movie = await tmdb.fetchMovieById({movieId});
	
		// get ratings 
		const query = {movieId: Number(movieId)};
		movie.ratings = await ratingModel.getRatings({query});
	
		// get credits
		movie.credits = await tmdb.fetchCredits({movieId});
		
		return {
			success: true,
			code: 200,
			message: "Fetched movie.",
			data: movie,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getMovieById;
