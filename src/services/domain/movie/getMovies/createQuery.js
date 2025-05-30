function createQuery({queries}){
	let query = "?";

	if(queries.page) query += `page=${queries.page}&`;
	if(queries.genres) query += `with_genres=${queries.genres}`;

	return query;
}


module.exports = createQuery;
