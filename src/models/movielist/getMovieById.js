async function getMovieById({query}){
	try{
		const db = await getDB();

		const result = await db.collection("movielists").findOne(query);

		return result;
	}
	catch(error){
		throw error;
	}
}
