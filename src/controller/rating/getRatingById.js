async function getRatingById({query}){
	try{
		const db = await getDB();
		const result = await db.collection("ratings").findOne(query);
		return result;
	}
	catch(error){
		throw error;
	}
}
