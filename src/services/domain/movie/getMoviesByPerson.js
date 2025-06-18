const tmdb = require("@tmdb");
const ratingModel = require("@models/rating");


async function getMoviesByPerson({personName}){
	let personIds = [];
	let movies = [];
	let movieIds = [];

	// get person id
	try{
		personIds = await tmdb.fetchPersonId({personName});
	}
	catch(error){
		throw error;
	}

	// get movies by person id
	try{
		movies = await tmdb.fetchMoviesByPersonId({personIds});
	}
	catch(error){
		throw error;
	}

	// add ratings
	try{
		const movieIds = movies.map(movie => movie.id);
		const query = {
			movieId: {
				$in: movieIds,
			}
		};

		const result = await ratingModel.getRatings({query});

		movies.forEach(movie => {
			movie.ratings = [];
		});
	}
	catch(error){
		throw error;
	}
	
	return {
		success: true,
		code: 200,
		message: "Sent movies.",
		data: movies,
	};
}


module.exports = getMoviesByPerson;
