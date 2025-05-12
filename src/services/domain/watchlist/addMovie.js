const watchlistModel = require("../../../models/watchlist");


async function addMovie({userId, movieId}){
	let watchlist = null;

	// check if watchlist exists, if not create watchlist and add movie to it
	try{
		const query = {userId};

		watchlist = await watchlistModel.getWatchlist({query});
	}
	catch(error){
		throw error;
	}

	if(!watchlist){
		try{
			const doc = {
				userId,
				watchlistId: randomUUID(),
				movies: [movieId],
			};

			watchlistModel.addWatchlist({doc});

			return {
				success: true,
				code: 200,
				message: "Movie has beed added to the watchlist.",
				data: {},
			};
		}
		catch(error){
			throw error;
		}
	}

	// check if movie is in watchlist already and add movie to watchlist
	try{
		const query = {
			userId,
			movies: movieId,
		};

		const result = await watchlistModel.getWatchlist({query});

		if(result){
			return {
				success: false,
				code: 200,
				message: "Movie already is in watchlist.",
				data: {},
			};
		}
	}
	catch(error){
		throw error;
	}
	
	try{
		const filter = {
			userId,
		};
		const update = {
			$push: {
				movies: movieId,
			}
		};

		const result = await watchlistModel.addMovie({filter, update});
		
		return {
			success: true,
			code: 200,
			message: "Movie has beed added to the watchlist.",
			data: {},
		};
	}
	catch(error){
		throw error;
	}
}
