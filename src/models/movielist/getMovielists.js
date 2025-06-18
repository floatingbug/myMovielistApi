const {getDB} = require("../../config/db");


async function getMovielists({query}){
	try{
		const db = await getDB();

		const cursor = db.collection("movielists").find(query);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getMovielists;
