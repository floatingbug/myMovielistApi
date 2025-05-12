const {getDB} = require("../../config/db");


async function addWatchlist({doc}){
	try{
		const db = await getDB();

		const result = await db.collection("watchlists").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = addWatchlist;
