async function fetchMovieById({movieId}){
	const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.TMDB_TOKEN,
		},
	};

	try{
		const response = await fetch(url, options)
		const result = await response.json();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchMovieById;
