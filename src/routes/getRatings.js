function getRatings({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	let ratings = null;

	try{
		const query = {
			creatorId: req.user.userId
		};

		ratings = await store.getDocuments({query, collectionName: "customizedData"});

		if(ratings.length <= 0){
			return res.status(400).json({success: false, msg: "No ratings have been found."});
		}
	}
	catch(error){
		sendServerError({res, error});
	}

	res.status(200).json({success: true, msg: "Ratings have been sent.", ratings});
}


module.exports = {getRatings};
