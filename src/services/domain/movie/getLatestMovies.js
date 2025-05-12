const tmdb = require("../../tmdb");


async function getLatestMovies(req, res, next){
	try{
		const result = await tmdb.fetchLatestMovies();

		return {
			success: true,
			code: 200,
			message: "Sent latest movies.",
			data: result,
		}
	}
	catch(error){
		throw error;
	}
}


module.exports = getLatestMovies;
