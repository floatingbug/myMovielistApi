async function fetchMovies({query}){
	const baseUrl = "https://api.themoviedb.org/3/discover/movie";
	const url = query ? `${baseUrl}${query}` : baseUrl;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.TMDB_TOKEN, 
		},
	};

	try{
		const response = await fetch(url, options);

		return await response.json();
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchMovies;
