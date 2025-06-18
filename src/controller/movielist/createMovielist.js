const movielistService = require("../../services/domain/movielist");
const response = require("../../utils/response");


async function createMovielist(req, res, next){
	console.log("test");
	try{
		const result = await movielistService.createMovielist({
			user: req.user,
			movielistname: req.body.movielistname,
			movieId: req.body.movieId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = createMovielist;
