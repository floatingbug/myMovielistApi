const {sendServerError} = require("../utils/sendServerError");
const {getMovienameById} = require("../api/apiCalls/getMovienameById");

function addCustomizedData({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	
	const {movieId, dataType, ...otherProps} = req.body;
		
	let document = {
		movieId,
		dataType,
	};

	//get moviename
	try{
		const moviename = await getMovienameById(movieId);
		document.movieName = moviename;
	}
	catch(error){
		return sendServerError({res, error});
	}

	//determine data and msg
	let msg = "";
	switch(dataType){
		case "rating":
			document.rating = otherProps.rating;
			document.comment = otherProps.comment;
			document.creatorId = req.user.userId;
			document.creatorName= req.user.name;
			msg = "Rating has been made.";
			break;
	}

	//check if use has rated already
	if(dataType === "rating"){
		const query = {
			creatorId: req.user.userId,
			movieId
		}

		try{
			const result = await store.getCustomizedData(query);
			if(result.length > 0){
				console.log("test");
				return res.status(400).json({success: false, msg: "You have rated this movie already."});
			}
		}
		catch(error){
			return sendServerError({res, error});
		}
	}

	//add customized data
	try{
		const result = await store.addCustomizedData(document);
		res.status(200).json({success: true, msg});
	}
	catch(error){
		return sendServerError({res, error});
	}
}


module.exports = {addCustomizedData};
