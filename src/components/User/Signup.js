import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { signup } from "../../redux/actions/auth";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import googlesvg from "../../assets/images/google.svg";
const theme = createTheme();
const Signup = ({ signup, isAuthenticated }) => {
	const ini = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		re_password: "",
	};
	const [accountCreated, setAccountCreated] = useState(false);
	const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "", re_password: "" });
	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();

		if (password === re_password) {
			signup(first_name, last_name, email, password, re_password);
			setAccountCreated(true);
		}
	};

	const continueWithGoogle = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);

			window.location.replace(res.data.authorization_url);
		} catch (err) {}
	};

	const continueWithFacebook = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`);

			window.location.replace(res.data.authorization_url);
		} catch (err) {}
	};

	if (isAuthenticated) {
		return <Navigate to='/' />;
	}
	if (accountCreated) {
		return <Navigate to='/login' />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh" }}>
				<Box sx={{ marginTop: "10vmin", textAlign: "center" }}>
					<Typography variant='h5'>ĐĂNG KÝ</Typography>

					<Box component='form' onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1, mb: 2 }}>
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
						></TextField>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							label='Tên'
							className='form-control'
							id='text'
							name='first_name'
							value={first_name}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							label='Họ'
							className='form-control'
							id='text'
							onChange={(e) => onChange(e)}
							name='last_name'
							value={last_name}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Mật khẩu'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={(e) => onChange(e)}
							value={password}
							minLength='6'
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Xác nhận mật khẩu'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={(e) => onChange(e)}
							value={password}
							minLength='6'
						/>

						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Đăng Ký
						</Button>
						<div class='google-btn' onClick={continueWithGoogle}>
							<div class='google-icon-wrapper'>
								<img class='google-icon' src={googlesvg} />
							</div>
							<p class='btn-text'>Tiếp tục với Google</p>
						</div>
						<div
							class='fb-login-button'
							data-width=''
							data-size='large'
							data-button-type='continue_with'
							data-layout='default'
							data-auto-logout-link='false'
							data-use-continue-as='false'
							onClick={continueWithFacebook}
						></div>

						<p className='mt-3'>
							Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
						</p>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
//export default Signup;
