import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./styles.css";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function Banner({ item }) {
	return (
		<CardMedia raised className='Banner' height='140'>
			<Grid container spacing={0} className='BannerGrid'>
				<CardMedia height='140' component='img' alt='green iguana' image={item} video={item}></CardMedia>
			</Grid>
		</CardMedia>
	);
}

const BannerFunction = ({ items }) => {
	return (
		<Carousel indicators={false}>
			{items &&
				items.map((item) => {
					return <><Banner item={item} key={item} /></>; /**/
				})}
		</Carousel>
	);
};
export default BannerFunction;
