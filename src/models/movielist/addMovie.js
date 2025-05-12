const {getDB} = require("../../config/db");


async function addMovieToMovielist({filter, update}){
	try{
		const db = await getDB();

		const result = await db.collection("movielists").updateOne(filter, update);

		return result
	}
	catch(error){
		throw error;
	}
}
