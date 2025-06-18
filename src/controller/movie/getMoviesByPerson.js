const movieService = require("@services/domain/movie");
const response = require("@utils/response");


async function getMoviesByPerson(req, res, next){
	const personName = req.query.name;

	try{
		const result = await movieService.getMoviesByPerson({personName});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getMoviesByPerson;
