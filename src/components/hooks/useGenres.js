const useGenres = (selectedGenres) => {
	if (selectedGenres.length < 1) return '';
	console.log('selectedGenres', selectedGenres);
	const genresIds = selectedGenres.map((g) => g.id);
	console.log('genreIds', genresIds);
	let genresIdString = genresIds.reduce((acc, val) => acc + ',' + val);
	console.log(genresIdString);
	return genresIdString;
};

export default useGenres;
