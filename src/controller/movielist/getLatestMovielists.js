const movielistService = require("@services/domain/movielist");
const response = require("@utils/response");


async function getLatestMovielists(req, res, next){
	try{
		const result = await movielistService.getLatestMovielists();

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getLatestMovielists;
