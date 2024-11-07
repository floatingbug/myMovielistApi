function sendServerError(param){
	const {res, error} = param;

	console.log(error);

	res.status(500).json({
		success: false, 
		errors: [
			{
				message: "Internal Server Error.",
			}
		]
	});
}


module.exports = {sendServerError};
