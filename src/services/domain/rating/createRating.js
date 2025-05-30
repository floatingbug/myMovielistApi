const ratingModel = require("@models/rating");


async function createRating({userId, rater, dateString, movieId, newRating}){
	try{
		//check if user has rated the movie already 
		const query = {
			userId,
			movieId,
		}

		const fetchedRatings = await ratingModel.getRatings({query});

		if(fetchedRatings.length > 0) {
			return {
				success: false,
				code: 400,
				errors: ["You have rated this movie already."],
			};
		}

		// create rating
		const doc = {
			userId,
			rater,
			dateString,
			movieId,
			...newRating,
		};

		const result = await ratingModel.createRating({doc});

		return {
			success: true,
			code: 200,
			message: "Rating created.",
			data: {},
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = createRating;
