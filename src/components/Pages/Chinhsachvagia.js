import * as React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useEffect } from "react";
export default function ChinhSachVaGia() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh", height: "80vh" }}>
			<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
				<Typography variant='h4'>CHÍNH SÁCH VÀ GIÁ</Typography>
				<Typography variant='p'>Đây là chi tiết về chính sách đăng tin, chính sách bảo mật dữ liệu, hoàn tiền tài khoản, giá đăng tin</Typography>
			</Box>
		</Container>
	);
}
