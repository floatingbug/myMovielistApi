const authService = require("@services/domain/auth");
const response = require("@utils/response");
const validator = require("validator");


async function signUp(req, res, next){
	const errors = validatePayload(req.body);

	if(errors.length > 0){
		return response(res, {
			success: false,
			code: 400,
			errors,
		});
	}

	try{
		const result = await authService.signUp({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload(payload) {
    const errors = [];
    const { name, email, password } = payload || {};

    if(!name) errors.push("Missing 'name'");
    if(!email) errors.push("Missing 'email'");
    if(!password) errors.push("Missing 'password'");

    if(name && typeof name !== "string") errors.push("'name' must be a string");
    if(email && typeof email !== "string") errors.push("'email' must be a string");
    if(password && typeof password !== "string") errors.push("'password' must be a string");
	
	if(typeof name === "string" && !validator.isLength(name, {min: 3, max: 20})){
		errors.push("'name' must have at least 3 and at most 20 characters");
	}
	if(typeof password === "string" && !validator.isLength(password, {min: 6, max: 50})){
		errors.push("'password' must have at least 6 and at most 50 characters");
	}
	if(typeof email === "string" && !validator.isEmail(email)){
		errors.push("'email' is not a valid email address");
	}

    return errors;
}

module.exports = signUp;
