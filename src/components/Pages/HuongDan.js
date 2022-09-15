import * as React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useEffect } from "react";
export default function HuongDan() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh", height: "80vh" }}>
			<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
				<Typography variant='h4'>HƯỚNG DẪN MAP TRỌ</Typography>
				<Typography variant='p'>Đây là phần hướng dẫn</Typography>
			</Box>
		</Container>
	);
}
