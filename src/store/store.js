const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);


const store = {
	client,
	db: client.db("myMovielist"),
	addUser,
	getUser,
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


module.exports = {store};
