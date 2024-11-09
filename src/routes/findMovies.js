const {sendServerError} = require("../utils/sendServerError");

function findMovies({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;

	const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
	const options = {
	  method: 'GET',
	  headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWFiYmViNjg5MjY4Nzk2ZWRkMzU4ZWIwNjU4MzEwZCIsIm5iZiI6MTczMTA4MDc1Ni43MzI0MzY3LCJzdWIiOiI2NzJlMmY1YmYwOTI3YWNkZTBkMWMzZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dKN_JH_mnORlWUmDnXaXlkesEGrjqL__yrZ9yKuTvBg'
	  }
	};

	try{
		const response = await fetch(url, options);
		const fetchedData = await response.json();

		res.status(200).json(fetchedData);
	}
	catch(error){
		sendServerError({res, error});
	}
}


module.exports = {findMovies};
