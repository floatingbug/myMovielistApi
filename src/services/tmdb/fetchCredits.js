module.exports =  async function({movieId}){
	const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
	const options = {
		method: 'GET', 
		headers: {
			accept: 'application/json',
			authorization: process.env.TMDB_TOKEN,
		},
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
