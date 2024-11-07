const {promisify} = require("util");
const {sendServerError} = require("../utils/sendServerError");

function signIn({jwt, store}){
	return (req, res) => {
		handleRequest({req, res, jwt, store});
	};
}


async function handleRequest(param){
	const {req, res, jwt, store} = param;
	let user = null;
	
	//get user
	try{
		const query = {
			$or: [
				{
					name: req.body.nameOrMail,
					password: req.body.password
				},
				{
					email: req.body.nameOrMail,
					password: req.body.password
				}
			]
		};

		user = await store.getUser(query);
		
		if(!user){
			const data = {
				success: false,
				errors: [
					{
						message: "User not found",
						path: ["userNotFound"]
					}
				]
			};

			return res.status(400).json(data);
		}
	}
	catch(error){
		return sendServerError({res, err});
	}

	//create and send jwt
	try{
		const signToken = promisify(jwt.sign);

		const token = await signToken(user, process.env.JWT_SECRET);

		res.status(200).json({
			success: true, 
			message: "Sign in was successfull", 
			token,
			user: {
				name: user.name,
				email: user.email
			}
		});
	}
	catch(error){
		sendServerError({res, error});
	}

}


module.exports = {signIn};
