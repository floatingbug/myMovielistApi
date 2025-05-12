async function getRatings({query}){
	try{
		const db = await getDB();
		const cursor = db.collection("ratings").find(query);
		const result = await cursor.toArray();
		return result;
	}
	catch(error){
		throw error;
	}
}
