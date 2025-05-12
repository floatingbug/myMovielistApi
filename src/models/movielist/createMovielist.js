const {getDB} = require("../../config/db");


async function createMovielist({doc}){
	try{
		const db = await getDB();

		const result = await db.collection("movielists").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = createMovielist;
