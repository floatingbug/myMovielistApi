function response(res, {success, code, data, message, errors}){
	if(success){
		successResponse(res, {code, data, message});
	}
	else{
		errorResponse(res, {code, errors});
	}
}

function successResponse(res, {code, data, message}){
	res.status(code).json({
		success: true,
		message,
		data,
	});
}

function errorResponse(res, {code, errors}){
	res.status(code).json({
		success: false,
		errors,
	});
}


module.exports = response;
