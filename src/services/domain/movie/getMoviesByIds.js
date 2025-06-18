const tmdb = require("@tmdb");
const ratingModel = require("@models/rating");


async function getMoviesByIds({movieIds}){
	let movies = [];
	let movieInfos = [];
	let ratings = [];

	// get movies from tmdb
	try{
		for(let i = 0; i < movieIds.length; i++){
			const movieId = movieIds[i];
			const result = await tmdb.fetchMovieById({movieId});
			movies.push(result);
		}

	}
	catch(error){
		throw error;
	}

	// get infos about movies from tmdb
	try{
		movieInfos = await tmdb.getMoviesInformations({movieIds});
	}
	catch(error){
		throw error;
	}

	// get ratings from db
	try{
		const query = {
			movieId: {
				$in: movieIds,
			},
		};

		ratings = await ratingModel.getRatings({query});
	}
	catch(error){
		throw error;
	}

	// add infos to movies
	movies?.forEach(movie => {
		// add infos
		movie.fsk = "";
		movieInfos?.forEach(info => {
			if(movie.id === info.id){
				movie.fsk = info.fsk;
			}
		});

		//add ratings
		movie.ratings = [];
		ratings?.forEach(rating => {
			if(movie.id === rating.movieId){
				movie.ratings.push(rating);
			}
		});
	});
	
	return {
		success: true,
		code: 200,
		message: "Sent movies.",
		data: {
			movies,
		},
	};
}


module.exports = getMoviesByIds;
