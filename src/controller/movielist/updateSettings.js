const movielistService = require("@services/domain/movielist");
const response = require("@utils/response");


async function updateSettings(req, res, next){
	try{
		const result = await movielistService.updateSettings({
			userId: req.user.userId,
			movielistId: req.body.movielistId,
			settings: req.body.settings,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = updateSettings;
