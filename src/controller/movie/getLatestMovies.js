const movieController = require("../../services/domain/movie");
const response = require("../../utils/response");


async function getLatestMovies(req, res, next){
	try{
		const result = await movieController.getLatestMovies();

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getLatestMovies;
