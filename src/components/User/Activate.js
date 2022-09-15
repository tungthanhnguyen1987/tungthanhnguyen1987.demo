import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../redux/actions/auth";
import { Box, Button, Typography } from "@mui/material";

const Activate = ({ verify, match }) => {
	const [verified, setVerified] = useState(false);

	const verify_account = (e) => {
		const uid = match.params.uid;
		const token = match.params.token;

		verify(uid, token);
		setVerified(true);
	};

	if (verified) {
		return <Navigate to='/homemap' />;
	}

	return (
		<Box sx={{ marginTop: "20vh" }}>
			<Typography>Verify your Account:</Typography>
			<Button onClick={verify_account} sx={{ marginTop: "50px" }}>
				Verify
			</Button>
		</Box>
	);
};

export default connect(null, { verify })(Activate);
