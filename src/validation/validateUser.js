function validateUser({jwt}){
	return (req, res, next) => {
		const token = req.headers.authorization?.split(" ")[1];

		if(!token) return res.status(401).json({success: false, msg: "Token not found. Please sign in again."});

		const result = verifyToken({token, jwt});

		if(!result.success) return res.status(401).json(result);


		req.user = result.user;
		next();
	};
}


function verifyToken(param){
	const {token, jwt} = param;

	try{
		const user = jwt.verify(token, process.env.JWT_SECRET);
		return {success: true, user};
	}
	catch(error){
		return {success: false, msg: error.message};
	}
}


module.exports = {validateUser};
