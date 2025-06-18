async function fetchPersonId({personName}){
	try{
		const url = `https://api.themoviedb.org/3/search/person?query=${personName}&include_adult=false&language=en-US&page=1`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				authorization: process.env.TMDB_TOKEN,
			}
		};

		const response = await fetch(url, options);
		const result = await response.json();
		const personIds = result.results.map(person => person.id);

		return personIds;
	}
	catch(error){
		throw error;
	}
}


module.exports = fetchPersonId;
