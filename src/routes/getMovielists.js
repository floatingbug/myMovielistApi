const {sendServerError} = require("../utils/sendServerError");

function getMovielists({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;
	let movielists = [];

	try{
		const query = {
			ownerId: req.user.userId
		};

		movielists = await store.getMovielists(query);

		if(movielists.length <= 0) return res.status(200).json({success: false, msg: "No movielists found."});
		res.status(200).json({success: true, msg: "Movielists have been sent.", movielists});
	}
	catch(error){
		sendServerError({res, error});
	}
}


module.exports = {getMovielists};
