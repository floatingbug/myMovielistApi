const movieService = require("@services/domain/movie");
const response = require("@utils/response");


async function getMoviesByIds(req, res, next){
	// validate payload
	try{
		const result = validateRequest({queries: req.query});

		if(!result.success){
			return response(res, result);
		}
	}
	catch(error){
		return next(error);
	}

	// process request
	const movieIds = req.query.movieIds.split(",").map(Number);

	try{
		const result = await movieService.getMoviesByIds({movieIds});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}

function validateRequest({queries}){
	if(!queries.movieIds || queries.movieIds === ""){
		return {
			success: false,
			code: 400,
			errors: ["Invalid Payload."],
		};
	}

	return {
		success: true,
	};
}


module.exports = getMoviesByIds;
