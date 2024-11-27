const {sendServerError} = require("../utils/sendServerError.js");

function getUser({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}

async function handleRequest(param){
	const {req, res, store} = param;

	try{
		const query = {userId: req.user.userId};
		const fetchedUser = await store.getUser(query);
		const user = {
			name: fetchedUser.name,
			email: fetchedUser.email,
		};

		return res.status(200).json({success: true, user});
	}
	catch(error){
		sendServerError({res, error});
	}
}


module.exports = {getUser};
