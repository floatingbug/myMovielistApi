const {sendServerError} = require("../utils/sendServerError");

function deleteMovielist({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const movielistId = req.query.movielistId;

	try{
		const filter = {movielistId};

		const result = await store.deleteMovielist(filter);
	}
	catch(error){
		sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Movielist has been deleted."});
}


module.exports = {deleteMovielist};
