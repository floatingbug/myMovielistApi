async function addMovie({userId, movielistId, movieId}){
	try{
		const filter = {
			userId,
			movielistId,
		};
		const update = {
			$push: {
				movies: movieId,
			}
		};

		const result = await movielistModel.addMovie({filter, update});

		return {
			success: true,
			code: 200,
			message: "Movie added.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = addMovie;
