const ratingModel = require("../../../models/rating");


async function createRating({userId, movieId, newRating}){
	try{
		const doc = {
			userId,
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
