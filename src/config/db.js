const {MongoClient} = require("mongodb");
const url = process.env.MONGO_URL;
let db = null;

const client = new MongoClient(url);


async function connectDB(){
	try{
		await client.connect();
		db = client.db("myMovielist");
		console.log("App connected to db.");
	}
	catch(error){
		console.log(error);
		process.exit(1);
	}
}


async function getDB(){
	if(!db){
		try{
			await client.connect();
			db = client.db("myMovielist");
		}
		catch(error){
			console.log(error);
			process.exit(1);
		}
	}

	return db;
}


module.exports = {getDB, connectDB};
