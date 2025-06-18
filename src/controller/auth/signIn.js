const authService = require("@services/domain/auth");
const response = require("@utils/response");
const validator = require("validator");


async function signIn(req, res, next){
	const errors = validatePayload(req.body);

	if(errors.length > 0){
		return response(res, {
			success: false,
			code: 400,
			errors,
		});
	}

	try{
		const result = await authService.signIn({
			nameOrEmail: req.body.nameOrEmail,
			password: req.body.password,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload(payload){
	const errors = [];
	const {nameOrEmail, password} = payload;

	if(!nameOrEmail) errors.push("missing 'name or email'"); 
	if(!password) errors.push("missing 'password'");

	if(typeof nameOrEmail !== "string" || typeof password !== "string"){
		errors.push("'name or email and password' must be a string");
	}

	if(typeof nameOrEmail === "string" && !validator.isLength(nameOrEmail, {})){
		errors.push("'name or email' must have at least 3 and at most 30 characters");
	}
	if(typeof password === "string" && !validator.isLength(password, {min: 6, max: 50})){
		errors.push("'password' must have at least 6 and at most 50 characters");
	}

	return errors;
}


module.exports = signIn;
