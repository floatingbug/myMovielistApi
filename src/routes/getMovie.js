const {sendServerError} = require("../utils/sendServerError");
const {getMovieById} = require("../api/apiCalls/getMovieById");


function getMovie({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const movieId = Number(req.query.movieId);
	let movie = {};

	//get movie from api
	try{
		const fetchedMovie = await getMovieById(movieId);
		movie.budget = fetchedMovie.budget;
		movie.homepage = fetchedMovie.homepage;
		movie.title = fetchedMovie.title;
		movie.description = fetchedMovie.overview;
		movie.cover = fetchedMovie.poster_path;
		movie.release = fetchedMovie.release_data;
		movie.runtime = fetchedMovie.runtime;
	}
	catch(error){
		return sendServerError({res, error});
	}

	//get customized data
	try{
		const query = {
			movieId
		};

		const collectionName = "customizedData";
		const customizedData = await store.getDocuments({query, collectionName});

		if(customizedData.length > 0) movie.customizedData = customizedData;
	}
	catch(error){
		return sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Movie has been sent.", movie});
};


module.exports = {getMovie};
