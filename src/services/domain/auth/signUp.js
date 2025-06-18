const authModel = require("@models/auth");
const userModel = require("@models/user");
const {randomUUID} = require("crypto");


async function signUp({name, email, password}){
	// check if user already exists
	try{
		const query = {
			name,
			email,
		}

		const result = await userModel.getUser({query});

		if(result){
			return {
				success: false,
				code: 400,
				errors: ["Name or E-Mail already exists."],
			};
		}
	}
	catch(error){
		throw error;
	}

	// add user to db
	try{
		const doc = {
			userId: randomUUID(),
			name,
			email,
			password,
			isEmailVerified: false,
			verifyCode: randomUUID(),
		};

		const result = await authModel.signUp({doc});

		return {
			success: true,
			code: 200,
			message: "User has been added.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = signUp;
