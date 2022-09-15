import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { btnlogin_click } from "../../redux/actions/controllers";
import axios from "axios";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./misc.css";
import googlesvg from "../../assets/images/google.svg";
const theme = createTheme();
const Login = ({ login, isAuthenticated, btnlogin_click }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		login(email, password);
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
		return <Navigate to='/homemap' />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh" }}>
				<Box sx={{ marginTop: "10vmin", textAlign: "center" }}>
					<Typography variant='h5'>ĐĂNG NHẬP</Typography>

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
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Đăng nhập
						</Button>
						<div class='google-btn' onClick={continueWithGoogle}>
							<div class='google-icon-wrapper'>
								<img class='google-icon' src={googlesvg} />
							</div>
							<p class='btn-text'>Tiếp tục với Google</p>
						</div>
						<div
							class='fb-login-button buttonfacebook'
							data-width=''
							data-size='large'
							data-button-type='continue_with'
							data-layout='default'
							data-auto-logout-link='false'
							data-use-continue-as='false'
							onClick={continueWithFacebook}
						></div>

						<p className='mt-3'>
							Bạn chưa có tài khoản? <Link to='/dangky'>Đăng ký ngay</Link>
						</p>
						<p className='mt-3'>
							Quên mật khẩu? <Link to='/reset-password'>Đặt lại mật khẩu</Link>
						</p>
					</Box>
				</Box>
				{/*<Typography variant='body2' color='text.secondary' align='center'>
					{"Copyright © "}
					<Link color='inherit' to='https://mui.com/'>
						MAP TRỌ
					</Link>{" "}
					{new Date().getFullYear()}
					{"."}
	</Typography>*/}
			</Container>
		</ThemeProvider>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
/*import React, { useState } from "react";
import axiosInstance from "./Axios.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
/*import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme();

export default function SignIn() {
	const history = useNavigate();
	const initialFormData = Object.freeze({
		email: "",
		password: "",
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem("refresh_token", res.data.refresh);
				axiosInstance.defaults.headers["Authorization"] = "JWT " + localStorage.getItem("access_token");
				history.push("/");
				//console.log(res);
				//console.log(res.data);
			});
	};

	return (
		
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{/*<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
                </Avatar>}
					<Typography component='h1' variant='h5'>
						Đăng nhập
					</Typography>
					
				</Box>
				
			
	);
}
*/
