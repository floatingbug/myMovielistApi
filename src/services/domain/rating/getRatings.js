const ratingModel = require("@models/rating");


async function getRatings({movieId}){
	try{
		const query = {
			movieId,
		};

		const result = await ratingModel.getRatings({query});

		return {
			success: true,
			code: 200,
			message: "Sent ratings.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getRatings;
