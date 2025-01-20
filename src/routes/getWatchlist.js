const {sendServerError} = require("../utils/sendServerError");


function getWatchlist({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	let watchlist = null;

	const query = {
		ownerId: req.user.userId
	};

	try{
		watchlist = await store.getDocuments({query, collectionName: "watchlists"});

		if(watchlist === null){
			return res.status(500).json({success: false, msg: "Fail to fetch watchlist. Please try reload the page."});
		}
	}
	catch(error){
		return sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Watchlist has been sent.", watchlist});
}


module.exports = {getWatchlist};
