import React from 'react';
import './SingleContent.css';
import { img_300 } from '../../config/Config';
import { Badge } from '@material-ui/core';
import ContentModal from '../../contentModal/ContentModal';

const SingleContent = ({ id, poster, title, date, media_type, vote_average }) => {
	return (
		<ContentModal media_type={media_type} id={id}>
			<Badge
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				color={vote_average > 6 ? 'primary' : 'secondary'}
				badgeContent={`IMDB:${vote_average}`}
			/>
			<img className="poster" src={`${img_300}/${poster}`} alt={title} srcset="" />
			<b className="title">{title}</b>
			<span className="subTitle">{media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
			<span className="subTitle">{date}</span>
		</ContentModal>
	);
};

export default SingleContent;
