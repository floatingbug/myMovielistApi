const movielistService = require("../../services/domain/movielist");
const response = require("@utils/response");


async function getMovielists(req, res, next){
	try{
		const result = await movielistService.getMovielists({
			userId: req.user.userId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getMovielists;
