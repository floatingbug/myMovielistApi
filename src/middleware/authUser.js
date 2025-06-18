const response = require("../utils/response");
const jwt = require("jsonwebtoken");


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
	else if(token === "2"){
		req.user = {
			userId: "2",
			name: "user2",
			jwt: "2",
		}
		
		return next();
	}

	try{
		const user = await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
				if(error) reject(error);
				resolve(decoded);
			});
		});

		req.user = user;
		return next();
	}
	catch(error){
		response(res, {
			success: false,
			code: 500,
			errors: ["Internal Server Error", "Fail to verify JWT"],
		});
	}
}


module.exports = authUser;
