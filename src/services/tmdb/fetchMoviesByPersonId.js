async function fetchMoviesByPersonId({personIds}){
	try{
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				authorization: process.env.TMDB_TOKEN,
			}
		}

		const promises = personIds.map(personId => {
			const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`;
			return fetch(url, options).then(res => res.json());
		});

		const responses = await Promise.all(promises);
		const moviesArray = responses.map(response => response.cast);
		const movies = moviesArray.flat();
		return movies;
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchMoviesByPersonId;
