const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);


const store = {
	client,
	db: client.db("myMovielist"),
	addUser,
	getUser,
	getCustomizedData,
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


module.exports = {store};
