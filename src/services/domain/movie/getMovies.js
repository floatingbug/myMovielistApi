const tmdb = require("@tmdb");


async function getMovies({query}){
	try{
		const result = await tmdb.fetchMovies({query});

		return {
			success: true,
			code: 200,
			message: "Sent movies.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getMovies;
