const movielistModel = require("../../../models/movielist");


async function getMovielists({userId}){
	try{
		const query = {
			userId,
		};

		const result = await movielistModel.getMovielists({query});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}
