import { Chip } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, type, setPage }) => {
	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		//console.log('genres', data);
		setGenres(data.genres);
	};

	useEffect(() => {
		fetchGenres();
		return () => {
			setGenres({});
		};
	}, []);

	const handleAdd = (genre) => {
		console.log(genre);
		setSelectedGenres([ ...selectedGenres, genre ]);
		setGenres(genres.filter((g) => g.id !== genre.id));
		setPage(1);
	};

	const handleRemove = (genre) => {
		console.log(genre);
		setGenres([ genre, ...genres ]);
		setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
		setPage(1);
	};

	//console.log('genres', genres);
	return (
		<div style={{ padding: '6px 0' }}>
			{selectedGenres &&
				selectedGenres.map((genre) => (
					<Chip
						style={{ margin: 2 }}
						key={genre.id}
						clickable
						onClick={() => handleRemove(genre)}
						label={genre.name}
						size="small"
						color="primary"
					/>
				))}
			{genres &&
				genres.map((genre) => (
					<Chip
						style={{ margin: 2 }}
						key={genre.id}
						clickable
						onClick={() => handleAdd(genre)}
						label={genre.name}
						size="small"
					/>
				))}
		</div>
	);
};

export default Genres;
