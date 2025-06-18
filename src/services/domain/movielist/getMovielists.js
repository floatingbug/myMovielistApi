const movielistModel = require("@models/movielist");


async function getMovielists({userId}){
	try{
		const query = {
			$or: [
				{isPublic: true},
				{userId},
			],
		};

		const result = await movielistModel.getMovielists({query});

		return {
			success: true,
			code: 200,
			message: "Sent movielists.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getMovielists;
