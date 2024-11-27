const {sendServerError} = require("../utils/sendServerError");
const {randomUUID} = require("crypto");

function addMovieList({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;

	try{
		const document = req.body;
		document.ownerId = req.user.userId;
		document.movielistId = randomUUID();
		document.movies = [];

		const result = await store.addMovieList(document);

		res.status(200).json({success: true, msg: "Movielist has been added."});
	}
	catch(error){
		sendServerError({res, error});
	}
}


module.exports = {addMovieList};
