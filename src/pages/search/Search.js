import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingleContent from '../../components/singleContent/SingleContent';

const darkTheme = createTheme({
	palette : {
		type    : 'dark',
		primary : {
			main : '#fff'
		}
	}
});

const Search = () => {
	const [ type, setType ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ searchText, setSearchText ] = useState('');
	const [ content, setContent ] = useState([]);
	const [ numOfPages, setNumOfPages ] = useState();

	const fetchSearch = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env
				.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
		);
		console.log(data);
		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(
		() => {
			window.scroll(0, 0);
			fetchSearch();
			console.log(searchText, content);
		},
		[ searchText, type, page ]
	);

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div className="search" style={{ display: 'flex', margin: '15px 0' }}>
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Enter your search..."
						variant="filled"
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button onClick={fetchSearch} style={{ marginLeft: 10 }} variant="outlined">
						<SearchIcon />
					</Button>
				</div>
				<Tabs
					style={{ paddingBottom: 5 }}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					value={type}
					onChange={(event, newValue) => {
						setType(newValue);
						console.log('event', event, 'newvalue', newValue);
						setPage(1);
					}}
				>
					<Tab style={{ width: '50%' }} label="Search Movies" />
					<Tab style={{ width: '50%' }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>
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
				{searchText && content !== true && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
			</div>
			{numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
		</div>
	);
};

export default Search;
