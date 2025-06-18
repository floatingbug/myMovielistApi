const movielistModel = require("@models/movielist");


async function addMovie({userId, movielistId, movieId}){
	// check if movie is already in movielist
	try{
		const query = {
			movielistId,
			movies: {
				$in: [movieId],
			},
		};

		const result = await movielistModel.getMovielists({query});

		if(result.length > 0){
			return {
				success: false,
				code: 400,
				errors: ["Movie is already in the movielist."],
			};
		}
	}
	catch(error){
		throw error;
	}

	// add movie
	try{
		const filter = {
			userId,
			movielistId,
		};
		const update = {
			$push: {
				movies: movieId,
			}
		};

		const result = await movielistModel.addMovie({filter, update});

		return {
			success: true,
			code: 200,
			message: "Movie added.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = addMovie;
