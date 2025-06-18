const movielistModel = require("@models/movielist");


async function getLatestMovielists(){
	try{
		const query = {
			$expr: {
				$gte: [
					{
						$size: "$movies",
					},
					3
				],
			}
		};

		const result = await movielistModel.getLatestMovielists({query});

		return {
			success: true,
			code: 200,
			message: "Sent latest movielists.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getLatestMovielists;
