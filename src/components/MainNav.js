import React from 'react';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root  : {
		width           : '100%',
		position        : 'fixed',
		bottom          : 0,
		backgroundColor : '#2d313a',
		zIndex          : 100
	},
	label : {
		backgroundColor : 'red',
		fontSize        : '6rem'
	}
});

export default function SimpleBottomNavigation() {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);
	const history = useHistory();
	useEffect(
		() => {
			if (value === 0) history.push('/');
			else if (value === 1) history.push('/');
			else if (value === 2) history.push('/movies');
			else if (value === 3) history.push('/series');
			else if (value === 4) history.push('/search');
		},
		[ value ]
	);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction className={classes.label} style={{ color: 'white' }} label="TueFlix App" textSize />
			<BottomNavigationAction style={{ color: 'white' }} label="Trending" icon={<WhatshotIcon />} />
			<BottomNavigationAction style={{ color: 'white' }} label="Movies" icon={<MovieIcon />} />
			<BottomNavigationAction style={{ color: 'white' }} label="TV Series" icon={<TvIcon />} />
			<BottomNavigationAction style={{ color: 'white' }} label="Search" icon={<SearchIcon />} />
		</BottomNavigation>
	);
}
