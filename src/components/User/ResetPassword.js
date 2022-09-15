import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../redux/actions/auth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
export const ResetPassword = ({ reset_password }) => {
	const [requestSent, setRequestSent] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
	});

	const { email } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		reset_password(email);
		setRequestSent(true);
	};

	if (requestSent) {
		return <Navigate to='/reset-password' />;
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
							id='email'
							label='Địa chỉ email'
							name='email'
							autoComplete='email'
							autoFocus
							value={email}
							onChange={(e) => onChange(e)}
						/>

						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Đặt lại mật khẩu
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default connect(null, { reset_password })(ResetPassword);
