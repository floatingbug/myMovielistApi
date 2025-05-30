async function getMoviesInformations({movieIds}){
    try{
        const results = [];

        for (const id of movieIds) {
            const url = `https://api.themoviedb.org/3/movie/${id}/release_dates`;

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_TOKEN,
                },
            };

            const response = await fetch(url, options);
            const data = await response.json();

            const deRelease = data.results.find(r => r.iso_3166_1 === "DE");
            const releaseWithCert = deRelease?.release_dates.find(r => r.certification);
            const fsk = releaseWithCert?.certification || "N/A";

            results.push({
                id,
                fsk: fsk !== "N/A" ? fsk : "N/A",
            });
        }

        return results;
    }catch (error) {
        throw error;
    }
}


module.exports = getMoviesInformations;
