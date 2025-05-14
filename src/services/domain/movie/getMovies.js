const tmdb = require("@tmdb");
const ratingModel = require("@models/rating");


async function getMovies({query}){
	try{
		const fetchedMovies = await tmdb.fetchMovies({query});

		// get additional informations from db
		const movieIds = fetchedMovies.results.map(movie => movie.id);
		
		// get ratings
		const ratingQuery = {
			movieId: {$in: movieIds},
		}
		const ratings = await ratingModel.getRatings({query: ratingQuery});

		// add the additional information to movies
		ratings?.forEach(rating => {
			fetchedMovies.results?.forEach(movie => {
				if(rating.movieId === movie.movieId){
					movie.rating = rating;
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
