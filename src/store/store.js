const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);


const store = {
	client,
	db: client.db("myMovielist"),
	addUser,
	getUser,
	getCustomizedData,
	addCustomizedData,
	addMovieList,
	getMovielists,
	addToMovielist,
	deleteMovies,
	deleteMovielist,
	getPublicMovielists,
	insertIntoCollection,
	insertIntoDocument,
	getDocuments,
};


async function addUser(document){
	try{
		const collUsers = this.db.collection("users");
		const result = await collUsers.insertOne(document);

		return true;
	}
	catch(error){
		throw error;
	}
}


async function getUser(query){
	try{
		const collUsers = this.db.collection("users");
		const result = await collUsers.findOne(query);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function getCustomizedData(query){
	try{
		const collCustomizedData = this.db.collection("customizedData");
		const result = await collCustomizedData.find(query);
		const customizedData = await result.toArray();

		return customizedData;
	}
	catch(error){
		throw error;
	}
}


async function addCustomizedData(document){
	try{
		const collCustomizedData = this.db.collection("customizedData");
		const result = await collCustomizedData.insertOne(document);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function addMovieList(document){
	try{
		const collMovieLists = this.db.collection("movielists");
		const result = await collMovieLists.insertOne(document);

		return result;
	}
	catch(error){
		throw error;
	}
}



async function getMovielists(query){
	try{
		const collMovielists = this.db.collection("movielists");
		const result = await collMovielists.find(query);
		const movielists = await result.toArray();
		
		return movielists;
	}
	catch(error){
		throw error;
	}
}


async function getPublicMovielists(query){
	try{
		const collMovielists = this.db.collection("movielists");
		const result = await collMovielists.find(query);
		const movielists = await result.toArray();

		return movielists;
	}
	catch(error){
		throw error;
	}
}


async function addToMovielist({filter, update}){
	try{
		const collMovielists = this.db.collection("movielists");
		const result = await collMovielists.updateOne(filter, update);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function deleteMovies(param){
	const {filter, update} = param;

	try{
		const collMovielists = this.db.collection("movielists");
		const result = await collMovielists.updateMany(filter, update);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function deleteMovielist(filter){
	try{
		const collMovielists = this.db.collection("movielists");
		const result = await collMovielists.deleteOne(filter);

		return result
	}
	catch(error){
		throw error;
	}
}


async function getDocuments({query, collectionName}){
	try{
		const coll = this.db.collection(collectionName);
		const result = await coll.find(query);
		const documents = await result.toArray();

		return documents;
	}
	catch(error){
		throw error;
	}
}


async function insertIntoCollection({document, collectionName}){
	try{
		const coll = this.db.collection(collectionName);
		const result = coll.insertOne(document);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function insertIntoDocument({filter, update, collectionName}){
	try{
		const coll = this.db.collection(collectionName);
		const result = await coll.updateOne(filter, update);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = {store};
