import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createTheme({
	palette : {
		type    : 'dark',
		primary : {
			main : '#fff'
		}
	}
});

const CustomPagination = ({ setPage, numOfPages }) => {
	const handlePageChange = (page) => {
		console.log(page);
		setPage(page);
		window.scroll(0, 0);
	};

	return (
		<div
			style={{
				width          : '100%',
				display        : 'flex',
				justifyContent : 'center',
				marginTop      : 10
			}}
		>
			<ThemeProvider theme={darkTheme}>
				<Pagination
					count={numOfPages}
					onChange={(event) => handlePageChange(event.target.textContent)}
					variant="outlined"
				/>
			</ThemeProvider>
		</div>
	);
};

export default CustomPagination;

//e.target.textContent is to get value of buttons in material UI || try using e.target.innherHTML
