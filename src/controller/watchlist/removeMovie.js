const watchlistService = require("@services/domain/watchlist");
const response = require("@utils/response");


async function removeMovie(req, res, next){
	try{
		const result = await watchlistService.removeMovie({
			movieId: req.body.movieId,
			userId: req.user.userId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = removeMovie;
