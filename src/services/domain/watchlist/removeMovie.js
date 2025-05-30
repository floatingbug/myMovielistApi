const watchlistModel = require("@models/watchlist");


async function removeMovie({userId, movieId}){
	try{
		const filter = {
			userId,
		};
		const update = {
			$pull: {
				movies: movieId,
			}
		};

		const result = await watchlistModel.removeMovie({filter, update});

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
