const services = require("@services/domain/movie");
const response = require("@utils/response");


async function getGenreList(req, res, next){
	try{
		const result = await services.getGenreList();

		response(res, {...result});
	}
	catch(error){
		next(error);
	}
}


module.exports = getGenreList;
