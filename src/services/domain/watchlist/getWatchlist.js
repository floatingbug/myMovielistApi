const watchlistModel = require("@models/watchlist");
const ratingModel = require("@models/rating");
const tmdb = require("@tmdb");


async function getWatchlist({userId}){
	let movieIds = [];
	let movies = [];
	let ratings = null;
	let movieInfos = null;

	// get movieIds
	try{
		const query = {
			userId,
		};

		const result = await watchlistModel.getWatchlist({query});

		if(!result || !result.movies || result.movies.length === 0){
			return {
				success: false,
				code: 400,
				errors: ["No movies in watchlist yet."],
			}
		}

		movieIds = result.movies;

	}
	catch(error){
		throw error;
	}

	// get ratings from db
	try{
		const ratingPromisis = movieIds.map(id => ratingModel.getRatings({
			query: {
				movieId: id,
			}
		}));

		const nestedRatings = await Promise.all(ratingPromisis);
		ratings = nestedRatings.flat();
	}
	catch(error){
		throw error;
	}

	// get movie infos from tmdb
	try{
		movieInfos = await tmdb.getMoviesInformations({movieIds});
	}
	catch(error){
		throw error;
	}
		
	// get movies from tmdb
	try{
		const moviePromises = movieIds.map(id => tmdb.fetchMovieById({movieId: id}));
		movies = await Promise.all(moviePromises);
	}
	catch(error){
		throw error;
	}

	//add additional data to movies
	movies?.forEach(movie => {
		// add ratings
		movie.ratings = [];

		ratings?.forEach(rating => {
			if(movie.id === rating.movieId){
				movie.ratings.push(rating);
			}
		});
	
		// add infos
		movieInfos?.forEach(info => {
			if(info.id === movie.id){
				movie.fsk = info.fsk;
			}
		});
	});
		
	return {
		success: true,
		code: 200,
		message: "Sent watchlist.",
		data: {
			movies,
		}
	};
}


module.exports = getWatchlist;
