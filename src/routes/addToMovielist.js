const {sendServerError} = require("../utils/sendServerError");

function addToMovielist({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;

	//check if movie is in list allready
	try{
		const query = {
			movielistId: req.body.movielistId
		};

		const movielist = await store.getMovielists(query);
		if(movielist.length === 0) return res.status(400).json({success: false, msg: "Movielist not found."});

		const movieId = movielist[0].movies.find(movie => req.body.movie.movieId === movie.movieId);
		if(movieId){
			return res.status(400).json({success: false, msg: "Movie is in list allready."});
		}
	}
	catch(error){
		return sendServerError({res, error});
	}

	try{
		const filter = {movielistId: req.body.movielistId};
		const update = {
			$push: {
				movies: {
					movieId: req.body.movie.movieId,
					title: req.body.movie.title,
					description: req.body.movie.description,
					cover: req.body.movie.cover
				}
			}
		};

		const result = await store.addToMovielist({filter, update});
		res.status(200).json({success: true, msg: "Movie has been added."});
	}
	catch(error){
		return sendServerError({res, error});
	}
}


module.exports = {addToMovielist};
