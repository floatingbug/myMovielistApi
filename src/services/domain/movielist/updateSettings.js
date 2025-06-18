const movielistModel = require("@models/movielist");


async function updateSettings({userId, movielistId, settings}){
	const filter = {
		userId,
		movielistId,
	};
	let update = {}
	if("isPublic" in settings){
		update = {
			...update,
			$set: {
				isPublic: settings.isPublic,
			}
		};
	}

	try{
		const result = await movielistModel.updateSettings({filter, update});

		return {
			success: true,
			code: 200,
			message: "Settings has been updated",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = updateSettings;
