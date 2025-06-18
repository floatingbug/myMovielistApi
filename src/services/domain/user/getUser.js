const jwt = require("jsonwebtoken");


async function getUser({token}){
	try{
		const user = await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
				if(error) reject(error);
				resolve(decoded);
			});
		});

		const {password, _id, isEmailVerified, verifyCode, ...publicUser} = user;

		return {
			success: true,
			code: 200,
			message: "Sent user.",
			data: publicUser,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getUser;
