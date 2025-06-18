const tmdb = require("@tmdb");
const ratingModel = require("@models/rating");
const createQuery = require("./getMovies/createQuery");
const watchlistModel = require("@models/watchlist");


async function getMovies({queries, user}){
	const query = createQuery({queries});

	try{
		const fetchedMovies = await tmdb.fetchMovies({query});

		console.log(fetchedMovies);

		if(!fetchedMovies){
			return {
				success: false,
				code: 400,
				errors: ["No movies has been found."],
			};
		}

		// get additional informations from db
		const movieIds = fetchedMovies.results.map(movie => movie.id);
		
		// get ratings
		const ratingQuery = {
			movieId: {$in: movieIds},
		}
		const ratings = await ratingModel.getRatings({query: ratingQuery});

		// add ratings to movies
		fetchedMovies.results?.forEach(movie => {
			movie.ratings = [];
			ratings?.forEach(rating => {
				if(rating.movieId === movie.id){
					if(!movie.ratings) movie.ratings = [];
					movie.ratings.push(rating);
				}
			});
		});

		// get watchlist info
		const watchlistQuery = {
			userId: user.userId,
		};
		const watchlist = await watchlistModel.getWatchlist({query: watchlistQuery});
		fetchedMovies.results?.forEach(movie => {
			movie.isInWatchlist = watchlist && watchlist.movies.includes(movie.id) ? true : false;
		});

		// get additional information from tmdb
		const moviesInformations = await tmdb.getMoviesInformations({movieIds});

		moviesInformations?.forEach(info => {
			fetchedMovies.results?.forEach(movie => {
				if(info.id === movie.id){
					movie.fsk = info.fsk;
				}
			});
		});

		return {
			success: true,
			code: 200,
			message: "Sent movies.",
			data: fetchedMovies,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getMovies;
