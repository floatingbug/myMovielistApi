const {getDB} = require("@config/db");


async function removeMovielist({doc}){
	const db = await getDB();
	const result = await db.collection("movielists").deleteOne(doc);

	return result;
}


module.exports = removeMovielist;
