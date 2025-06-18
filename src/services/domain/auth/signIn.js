const userModel = require("@models/user");
const jwt = require("jsonwebtoken");


async function signIn({nameOrEmail, password}){
	let user = null;

	// get user
	try{
		const query = {
			$or: [
				{
					name: nameOrEmail,
					password,
				},
				{
					email: nameOrEmail,
					password,
				},
			],
		};

		user = await userModel.getUser({query});
		if(!user){
			return {
				success: false,
				code: 400,
				errors: ["Name/E-Mail or Password is wrong"],
			}
		}
	}
	catch(error){
		throw error;
	}
	
	// create and send token
	try{
		const token = await new Promise((resolve, reject) => {
			jwt.sign(user, process.env.JWT_SECRET, (error, token) => {
				if(error) reject(error);
				resolve(token);
			});
		});

		const {password, _id, isEmailVerified, verifyCode, ...publicUser} = user;

		return {
			success: true,
			code: 200,
			message: "Sent token",
			data: {
				token,
				user: publicUser,
			}
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = signIn;
