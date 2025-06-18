const {getDB} = require("@config/db");


async function getUser({query}){
	const db = await getDB();
	const result = await db.collection("users").findOne(query);

	return result;
}


module.exports = getUser;
