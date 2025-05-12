async function fetchLatestMovies(){
	const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.TMDB_TOKEN,
		}
	};

	try{
		const response = await fetch(url, options);
		const result = await response.json();
		
		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchLatestMovies;
