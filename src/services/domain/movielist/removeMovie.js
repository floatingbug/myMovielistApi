const movielistModel = require("@models/movielist");


async function removeMovie({movielistId, movieId, userId}){
	// remove movie from db
	try{
		const filter = {
			movielistId,
			userId,
		};
		const update = {
			$pull: {
				movies: movieId,
			}
		};

		const result = await movielistModel.removeMovie({filter, update});

		return {
			success: true,
			code: 200,
			message: "Movie has been removed.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = removeMovie;
