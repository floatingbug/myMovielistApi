const movielistModel = require("@models/movielist");
const {randomUUID} = require("crypto");


async function createMovielist({user, movielistname, movieId}){
	try{
		const doc = {
			timestamp: Date.now(),
			movielistId: randomUUID(),
			movielistname,
			userId: user.userId,
			creatorName: user.name,
			movies: [movieId],
			isPublic: true,
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
