const response = require("@utils/response");
const movieService = require("@services/domain/movie");


async function getMovieById(req, res, next){
	try{
		const result = await movieService.getMovieById({
			movieId: req.query.movieId,
		});

		response(res, result);
	}
	catch(error){
		return next(error);
	}
}


module.exports = getMovieById;
