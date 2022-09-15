import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { facebookAuthenticate } from "../../redux/actions/auth";
import queryString from "query-string";
import { Box, Typography } from "@mui/material";

const Facebook = ({ facebookAuthenticate }) => {
	let location = useLocation();

	useEffect(() => {
		const values = queryString.parse(location.search);
		const state = values.state ? values.state : null;
		const code = values.code ? values.code : null;

		console.log("State: " + state);
		console.log("Code: " + code);

		if (state && code) {
			facebookAuthenticate(state, code);
		}
	}, [location]);

	return (
		<Box sx={{ marginTop: "10vh" }}>
			<div class='jumbotron mt-5'>
				<Typography class='display-4'>Welcome to Auth System!</Typography>
				<p class='lead'>This is an incredible authentication system with production level features!</p>
				<hr class='my-4' />
				<p>Click the Log In button</p>
				<Link class='btn btn-primary btn-lg' to='/login' role='button'>
					Login
				</Link>
			</div>
		</Box>
	);
};

export default connect(null, { facebookAuthenticate })(Facebook);
