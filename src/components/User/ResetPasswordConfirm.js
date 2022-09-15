import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
const theme = createTheme();
const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
	const [requestSent, setRequestSent] = useState(false);
	const [formData, setFormData] = useState({
		new_password: "",
		re_new_password: "",
	});

	const { new_password, re_new_password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		const uid = match.params.uid;
		const token = match.params.token;

		reset_password_confirm(uid, token, new_password, re_new_password);
		setRequestSent(true);
	};

	if (requestSent) {
		return <Navigate to='/homemap' />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh" }}>
				<Box sx={{ marginTop: "10vmin", textAlign: "center" }}>
					<Typography variant='h5'>ĐẶT LẠI MẬT KHẨU</Typography>

					<Box component='form' onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1 }}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Mật khẩu'
							type='password'
							id='password'
							value={new_password}
							minLength='6'
							autoComplete='current-password'
							onChange={(e) => onChange(e)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='re_new_password'
							label='Xác nhận Mật khẩu'
							type='password'
							id='password'
							value={re_new_password}
							minLength='6'
							autoComplete='current-password'
							onChange={(e) => onChange(e)}
						/>

						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							ResetPassword
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
