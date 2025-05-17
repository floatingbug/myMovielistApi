const ratingService = require("@services/domain/rating");
const response = require("@utils/response.js");


async function getRatings(req, res, next){
	const movieId = req.query.movieId;

	try{
		const result = await ratingService.getRatings({
			movieId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getRatings;
