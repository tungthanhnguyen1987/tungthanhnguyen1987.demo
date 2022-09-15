import * as React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useEffect } from "react";
export default function ThongTinTaiKhoan() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh", height: "80vh" }}>
			<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
				<Typography variant='h4'>THÔNG TIN TÀI KHOẢN</Typography>
				<Typography variant='p'>Đây là phần thông tin tài khoản của chủ nhà</Typography>
			</Box>
		</Container>
	);
}
