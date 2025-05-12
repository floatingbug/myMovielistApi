const movielistService = require("../../services/domain/movielist");
const response = require("../../utils/response");


async function createMovielist(req, res, next){
	try{
		const result = await movielistService.createMovielist({
			userId: req.user.userId,
			movielistName: req.body.movielistName,
			movieId: req.body.movieId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = createMovielist;
