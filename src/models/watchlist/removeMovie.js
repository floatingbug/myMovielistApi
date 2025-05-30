const {getDB} = require("@config/db");


async function removeMovie({filter, update}){
	try{
		const db = await getDB();
		const result = await db.collection("watchlists").updateOne(filter, update);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = removeMovie;
