const movieService = require("../../services/domain/movie");
const response = require("../../utils/response");


async function getMovies(req, res, next){
	try{
		const result = await movieService.getMovies({
			queries: req.query,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getMovies;
