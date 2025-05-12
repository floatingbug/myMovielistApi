const response = require("../utils/response");


async function authUser(req, res, next){
	const token = req.headers["authorization"];

	if(token === "1"){
		req.user = {
			userId: "1",
			name: "user",
			jwt: "1",
		};

		return next();
	}

	response(res, {
		success: false,
		code: 401,
		errors: ["Unauthorized"],
	});
}


module.exports = authUser;
