async function fetchGenreList(){
	try{
		const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
		const options = {
				method: 'GET',
				headers: {
				accept: 'application/json',
				Authorization: process.env.TMDB_TOKEN  
			}
		};

		const response = await fetch(url, options);
		const result = await response.json();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchGenreList;
