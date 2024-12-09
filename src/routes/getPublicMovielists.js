const {sendServerError} = require("../utils/sendServerError");


function getPublicMovielists({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;

	try{
		const query = {
			isPublic: true
		}

		const movielists = await store.getPublicMovielists(query);

		if(movielists.length === 0) {
			return res.status(400).json({success: false, msg: "No movielists have been found."});
		}

		res.status(200).json({success: true, msg: "Movielists have been sent.", movielists});
	}
	catch(error){
		return sendServerError({res, error});
	}
}


module.exports = {getPublicMovielists};
