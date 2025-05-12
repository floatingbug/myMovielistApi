const {getDB} = require("../../config/db");


async function getWatchlist({query}){
	try{
		const db = await getDB();
		
		const result = await db.collection("watchlists").findOne(query);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getWatchlist;
