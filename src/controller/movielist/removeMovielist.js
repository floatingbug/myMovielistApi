const movielistService = require("@services/domain/movielist");
const response = require("@utils/response");


async function removeMovielist(req, res, next){
	try{
		const movielistId = req.body.movielistId;
		const userId = req.user.userId;

		const result = await movielistService.removeMovielist({userId, movielistId});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = removeMovielist;
