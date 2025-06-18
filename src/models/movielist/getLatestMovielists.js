const {getDB} = require("@config/db");


async function getLatestMovielists({query}){
	try{
		const db = await getDB();
		const cursor = db.collection("movielists").find(query);
		cursor.sort({
			timestamp: -1,
		});
		cursor.limit(6);

		const result = await cursor.toArray();
		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getLatestMovielists;
