const watchlistService = require("@services/domain/watchlist");
const response = require("@utils/response");


async function getWatchlist(req, res, next){
	const userId = req.user.userId;

	try{
		const result = await watchlistService.getWatchlist({userId});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getWatchlist;
