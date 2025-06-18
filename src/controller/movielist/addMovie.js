const movielistService = require("../../services/domain/movielist");
const response = require("../../utils/response");


async function addMovie(req, res, next){
	try{
		const result = await movielistService.addMovie({
			userId: req.user.userId,
			movielistId: req.body.movielistId,
			movieId: req.body.movieId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = addMovie;
