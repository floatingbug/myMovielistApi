const movielistModel = require("../../../models/movielist");
const {randomUUID} = require("crypto");


async function createMovielist({userId, movieId}){
	try{
		const doc = {
			movielistId: randomUUID,
			userId,
			movies: [movieId],
		};

		const result = await movielistModel.createMovielist({doc});

		return {
			success: true,
			code: 200,
		};
	}
	catch(error){
		next(error);
	}
}


module.exports = createMovielist;
