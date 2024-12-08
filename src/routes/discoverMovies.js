const {sendServerError} = require("../utils/sendServerError");
const url = require("url");

function discoverMovies({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	let movies = [];
	let genreList = [];
	let metaData = {};


	// get movielist
	try{
		const queryString = url.parse(req.url).query;
		const apiUrl = `https://api.themoviedb.org/3/discover/movie?${queryString}`;
		const options = {
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			Authorization: process.env.API_TOKEN
		  }
		};

		const response = await fetch(apiUrl, options);
		const fetchedData = await response.json();


		movies = fetchedData.results;
		metaData = {
			page: fetchedData.page,
			totalPages: fetchedData.total_pages,
			totalResults: fetchedData.total_results
		}
	}
	catch(error){
		return sendServerError({res, error});
	}

	// get genre list for sending genreIds to client so client can filter by genre at next request
	try{
		const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
		const options = {
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			Authorization: process.env.API_TOKEN
		  }
		};

		const response = await fetch(url, options);
		genreList = await response.json();
	}
	catch(error){
		return sendServerError({res, error});
	}

	// add customized data to the movielist elements
	try{
		const movieIds = movies.map(movie => {
			return {id: movie.id};
		});
		const query = {
			$or: movieIds
		}

		const customizedData = await store.getCustomizedData(query);

		if(customizedData.length > 0){
			const customizedDataMap = customizedDataMap.reduce((acc, data) => {
				acc[data.id] = data;
				return acc;
			}, {});

			movies.forEach(movie => {
				const data = customizedDataMap[movie.id];

				if(data) movie.customizedData = data;
			});
		}
	}
	catch(error){
		return sendServerError({res, error});
	}

	res.status(200).json({movies, genreList, metaData});
}


module.exports = {discoverMovies};
