const response = require("../../utils/response");
const ratingService = require("../../services/domain/rating");


async function createRating(req, res, next){
	const timestamp = Date.now();
	const date = new Date(timestamp);
	const dateString = date.toLocaleString();


	try{
		const userId = req.user.userId;
		const rater = req.user.name;
		const movieId = req.body.movieId;
		const newRating = req.body.rating;

		const result = await ratingService.createRating({newRating, userId, movieId, rater, dateString});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = createRating;
