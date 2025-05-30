const response = require("@utils/response");
const movieService = require("@services/domain/movie");


async function getMovieById(req, res, next){
	try{
		const result = await movieService.getMovieById({
			movieId: Number(req.query.movieId),
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		return next(error);
	}
}


module.exports = getMovieById;
