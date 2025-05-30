const ratingModel = require("@models/rating");
const watchlistModel = require("@models/watchlist");
const tmdb = require("@tmdb");


async function getMovieById({movieId, user}){
	try{
		// get movie
		const movie = await tmdb.fetchMovieById({movieId});
	
		// get ratings 
		const query = {movieId: Number(movieId)};
		movie.ratings = await ratingModel.getRatings({query});
	
		// get credits
		movie.credits = await tmdb.fetchCredits({movieId});

		// add watchlist info
		const watchlistQuery = {
			userId: user.userId,
			movies: {
				$in: [movieId],
			}
		};
		const watchlist = await watchlistModel.getWatchlist({query: watchlistQuery});
		movie.isInWatchlist = watchlist ? true : false;

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
