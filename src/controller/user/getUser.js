const userService = require("@services/domain/user");
const response = require("@utils/response");


async function getUser(req, res, next){
	try{
		const token = req.headers["authorization"];
		const result = await userService.getUser({token});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getUser;
