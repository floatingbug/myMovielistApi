const {sendServerError} = require("../utils/sendServerError");

function searchMovies({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;
	const page = req.query.page;
	const input = req.query.input;
	let personIds = [];
	let movies = [];
	let totalResults = 0;
	
	//get id from actor
	try{
		const url = `https://api.themoviedb.org/3/search/person?query=${input}&include_adult=false&language=en-US&page=1}`;
		const options = {
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			Authorization: process.env.API_TOKEN 
		  }
		};

		const response = await fetch(url, options);
		const persons = await response.json();

		personIds = persons.results.map(person => person.id);
	}
	catch(error){
		return sendServerError({res, error});
	}

	//get movies by personIds
	try{
		const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_cast=${personIds.join("|")}`;
		const options = {
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			Authorization: process.env.API_TOKEN
		  }
		};

		const response = await fetch(url, options);
		const fetchedMovies = await response.json();

		totalResults += fetchedMovies.total_results;

		movies.push(...fetchedMovies.results);
	}
	catch(error){
		return sendServerError({res, error});
	}

	//get movies by input (movie name)
	try{
		const url = `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=${page}`;
		const options = {
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			Authorization: process.env.API_TOKEN
		  }
		};

		const response = await fetch(url, options);
		const fetchedMovies = await response.json();
		
		totalResults += fetchedMovies.total_results;
			
		movies.push(...fetchedMovies.results);
	}
	catch(error){
		return sendServerError({res, error});
	}

	console.log(totalResults);

	const data = {
		totalResults,
		movies
	}

	res.status(200).json({success: true, msg: "Movies have been sent.", data});
}


module.exports = {searchMovies};
