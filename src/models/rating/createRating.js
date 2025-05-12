const {getDB} = require("../../config/db");


async function createRating({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("ratings").insertOne(doc);
		return result;
	}
	catch(error){
		throw error;
	}
}


module.export = createRating;
