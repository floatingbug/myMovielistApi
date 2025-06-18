const movielistModel = require("@models/movielist");


async function removeMovielist({userId, movielistId}){
	try{
		const doc = {
			userId,
			movielistId,
		};

		const result = await movielistModel.removeMovielist({doc});

		return {
			success: true,
			code: 200,
			message: "Movielist hast been deleted.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = removeMovielist;
