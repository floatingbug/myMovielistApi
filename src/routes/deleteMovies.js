const {sendServerError} = require("../utils/sendServerError");

function deleteMovies({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;

	try{
		const filter = {
			movielistId: req.body.movielistId
		};
		const update = {
			$pull: {
				movies: {
					movieId: {$in: req.body.movieIds}
				}
			}
		};

		const result = await store.deleteMovies({filter, update});
	}
	catch(error){
		sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Movie has been deleted."});
}


module.exports = {deleteMovies};
