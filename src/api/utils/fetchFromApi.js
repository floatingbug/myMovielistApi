async function fetchFromApi(url, options){
	try{
		let errorMsg = "";

		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	}
	catch(error){
		return error;
	}
}


module.exports = {fetchFromApi};
