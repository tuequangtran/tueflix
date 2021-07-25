import axios from 'axios';
import React from 'react';
import './Trending.css';
import { useState, useEffect } from 'react';
import SingleContent from '../../components/singleContent/SingleContent';
import CustomPagination from '../../components/pagination/CustomPagination';

const Trending = () => {
	const [ content, setContent ] = useState([]);
	const [ page, setPage ] = useState(1);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);
		//console.log(data.results);
		setContent(data.results);
	};

	useEffect(
		() => {
			fetchTrending();
		},
		[ page ]
	);

	return (
		<div>
			<span className="pageTitle">Trending</span>
			<div className="trending">
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</div>
			<CustomPagination setPage={setPage} numOfPages={10} />
		</div>
	);
};

export default Trending;
