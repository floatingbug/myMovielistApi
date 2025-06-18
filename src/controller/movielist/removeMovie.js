const movielistService = require("@services/domain/movielist");
const response = require("@utils/response");


async function removeMovie(req, res, next){
	try{
		const result = await movielistService.removeMovie({
			movielistId: req.body.movielistId,
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
