const {sendServerError} = require("../utils/sendServerError");


function addToWatchlist({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;

	//check if movie is in watchlist allready
	try{
		const movieId = [req.body.movie.movieId];

		const query = {
			movies: {
				$elemMatch: {
					movieId: {
						$in: [req.body.movie.movieId]
					}
				}
			}
		};

		const movie = await store.getDocuments({query, collectionName: "watchlists"});

		
		if(movie.length > 0) return res.status(400).json({success: false, msg: "Movie is in your watchlist already."});
	}
	catch(error){
		return sendServerError({res, error});
	}

	//add movie to watchlist
	try{
		const filter = {
			ownerId: req.user.userId
		};

		const update = {
			$push: {
				movies: req.body.movie
			}
		}; 

		const result = await store.insertIntoDocument({filter, update, collectionName: "watchlists"});
	}
	catch(error){
		return sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Movie has been added to your watchlist."});
}


module.exports = {addToWatchlist};
