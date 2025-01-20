const {randomUUID} = require("crypto");
const {sendServerError} = require("../utils/sendServerError");

function signUp({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(params){
	const {req, res, store} = params;
	const userId = randomUUID();

	//check if name or email is already in db
	try{
		const query = {
			$or: [
				{name: req.body.name},
				{email: req.body.email}
			]
		}

		const result = await store.getUser(query);

		if(result){
			const data = {
				success: false,
				errors: [
					{
						message: "Name or e-mail allready exists",
						path: ["existsAllready"]
					}
				]
			};

			return res.status(400).json(data);
		}
	}
	catch(error){
		return sendServerError({res, error});
	}
	
	//add user to db
	try{
		const document = req.body;
		document.userId = userId;
		document.isMailValidated = false;
		document.validationNumber = randomUUID();

		const result = await store.addUser(document);
		if(!result) return sendServerError({res});
	}
	catch(error){
		return sendServerError({res, error});
	}

	//add watchlist
	try{
		const document = {
			ownerId: userId,
			watchlistId: randomUUID()
		};

		const result = await store.insertIntoCollection({document, collectionName: "watchlists"});
	}
	catch(error){
		return sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Sign up succeeded."});
}


module.exports = {signUp};
