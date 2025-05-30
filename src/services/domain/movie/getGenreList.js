const tmdb = require("@tmdb");


async function getGenreList(){
	try{
		const result = await tmdb.fetchGenreList();

		return {
			success: true,
			code: 200,
			message: "Sent genre-list.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getGenreList;
