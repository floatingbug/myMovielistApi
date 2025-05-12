const watchlistService = require("../../services/domain/watchlist");
const response = require("../../utils/response");


async function addMovie(req, res, next){
	try{
		const result = await watchlistService.addMovie({
			userId: req.user.userId,
			movieId: req.body.movieId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = addMovie;
