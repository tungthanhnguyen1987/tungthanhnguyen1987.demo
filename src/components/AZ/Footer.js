import * as React from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Ptheme } from "./Ptheme";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Grid, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { set_footer_on } from "../../redux/actions/controllers";
import { useViewPort } from "./Header";
function Footer({ is_footer_on }) {
	const left = [
		{ name: "Tình hình bất động sản trong nước - cập nhật mới nhất", link: "/phongtro" },
		{ name: "Một số quy định pháp luật liên quan đến thuê và cho thuê nhà ở, mặt bằng kinh doanh", link: "/dangky" },
	];
	const mid = [
		{ name: "Tạo dữ liệu nhà cho thuê của bạn", link: "/taonhatro" },
		{ name: "Đăng tin ngay với dữ liệu nhà cho thuê đã có", link: "/dangtin" },
		{ name: "Sửa dữ liệu nhà cho thuê đã có", link: "/dangtin" },
		{ name: "Chính sách và giá", link: "/chinhsachvagia" },
		{ name: "Quản lý tin đăng", link: "/quanlytindang" },
		{ name: "Hướng dẫn", link: "/huongdan" },
	];
	const about_right = [
		{ name: "Về nhóm Map Trọ", link: "/aboutus" },
		{ name: "Thư ngỏ từ những người làm ra trang web này", link: "/thungo" },
		{ name: "Tận dụng sự đóng góp dữ liệu của cộng đồng một cách hữu ích", link: "/thungo" },
		{ name: "Chúng tôi luôn tuân thủ pháp luật bản quyền và dữ liệu", link: "/thungo" },
		{ name: "DONATE cho chúng tôi", link: "/dangky" },
		{ name: "Tiếp tục theo dõi chúng tôi trên mạng xã hội", link: "/dangky" },
	];
	const viewPort = useViewPort();
	const isMobile = viewPort.width <= 800;
	const [expanded, setExpanded] = React.useState("panel1");
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : true);
	};

	return (
		<>
			{isMobile && is_footer_on ? (
				<>
					<ThemeProvider theme={Ptheme}>
						<AppBar position='static' color='primary' sx={{ top: "auto", bottom: 0, fontWeight: "light" }}>
							<Grid container spacing={0} sx={{ textAlign: "left" }}>
								<Grid item xs={1} sm={1} md={1.5}></Grid>
								<Grid item xs={11} sm={11} md={9}>
									<Grid container spacing={1}>
										<Grid item xs={12} sm={12} md={4}>
											<Box sx={{ width: "100%", textAlign: "left" }}>
												<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>TIN TỨC NHÀ Ở</Typography>
												{left.map((x) => (
													<Box
														component={Link}
														to={x.link}
														sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
													>
														<Typography sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}>
															{x.name}
														</Typography>
													</Box>
												))}
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} md={4}>
											<Box sx={{ width: "100%", textAlign: "left" }}>
												<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>CHỦ NHÀ</Typography>
												{mid.map((x) => (
													<Box
														component={Link}
														to={x.link}
														sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
													>
														<Typography sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}>
															{x.name}
														</Typography>
													</Box>
												))}
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} md={4}>
											<Box sx={{ width: "100%", textAlign: "left" }}>
												<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>MAP TRỌ</Typography>
												{about_right.map((x) => (
													<Box component={Link} to={x.link} sx={{ ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}>
														<Typography sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}>
															{x.name}
														</Typography>
													</Box>
												))}
											</Box>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={1} sm={1} md={1.5}></Grid>
							</Grid>
							<Grid container spacing={2} sx={{ textAlign: "left", marginTop: "10vh" }}>
								<Grid item xs={1} sm={1} md={1.5}></Grid>
								<Grid item xs={11} sm={11} md={9}>
									<Typography>
										<Box sx={{ display: "flex" }}>
											<Typography sx={{ color: "#1e656d", fontWeight: "light", textDecoration: "none" }}>
												Copyright&copy;{new Date().getFullYear()} MAP TRỌ *
												<Typography
													component={Link}
													sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
													to='/aboutus'
												>
													Tất cả các quyền *
												</Typography>{" "}
												<Typography
													component={Link}
													sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
													to='/chinhsachvagia'
												>
													Điều khoản dịch vụ *
												</Typography>
												<Typography
													component={Link}
													sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
													to='/chinhsachvagia'
												>
													Chính sách dữ liệu và bảo mật
												</Typography>
											</Typography>
										</Box>
									</Typography>
								</Grid>
								<Grid item xs={1} sm={1} md={1.5}></Grid>
							</Grid>
						</AppBar>
					</ThemeProvider>
				</>
			) : (
				<>
					{is_footer_on ? (
						<ThemeProvider theme={Ptheme}>
							<AppBar position='fixed' color='primary' sx={{ top: "auto", bottom: 0, fontWeight: "light" }}>
								<Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
									<AccordionSummary expandIcon={<KeyboardDoubleArrowUpIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
										<Typography>
											<Box sx={{ display: "flex" }}>
												<Typography sx={{ color: "#1e656d", fontWeight: "light", textDecoration: "none" }}>
													Copyright&copy;{new Date().getFullYear()} MAP TRỌ *
													<Typography
														component={Link}
														sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
														to='/aboutus'
													>
														Tất cả các quyền *
													</Typography>{" "}
													<Typography
														component={Link}
														sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
														to='/chinhsachvagia'
													>
														Điều khoản dịch vụ *
													</Typography>
													<Typography
														component={Link}
														sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
														to='/chinhsachvagia'
													>
														Chính sách dữ liệu và bảo mật
													</Typography>
												</Typography>
											</Box>
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid container spacing={0} sx={{ textAlign: "left" }}>
											<Grid item xs={1} sm={1} md={1.5}></Grid>
											<Grid item xs={11} sm={11} md={9}>
												<Grid container spacing={1}>
													<Grid item xs={12} sm={12} md={4}>
														<Box sx={{ width: "100%", textAlign: "left" }}>
															<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>TIN TỨC NHÀ Ở</Typography>
															{left.map((x) => (
																<Box
																	component={Link}
																	to={x.link}
																	sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
																>
																	<Typography
																		sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
																	>
																		{x.name}
																	</Typography>
																</Box>
															))}
														</Box>
													</Grid>
													<Grid item xs={12} sm={12} md={4}>
														<Box sx={{ width: "100%", textAlign: "left" }}>
															<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>CHỦ NHÀ</Typography>
															{mid.map((x) => (
																<Box
																	component={Link}
																	to={x.link}
																	sx={{ color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
																>
																	<Typography
																		sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
																	>
																		{x.name}
																	</Typography>
																</Box>
															))}
														</Box>
													</Grid>
													<Grid item xs={12} sm={12} md={4}>
														<Box sx={{ width: "100%", textAlign: "left" }}>
															<Typography sx={{ color: "#1e656d", fontWeight: "bold" }}>MAP TRỌ</Typography>
															{about_right.map((x) => (
																<Box component={Link} to={x.link} sx={{ ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}>
																	<Typography
																		sx={{ mt: 2, color: "#1e656d", ":hover": { color: "#f00" }, fontWeight: "light", textDecoration: "none" }}
																	>
																		{x.name}
																	</Typography>
																</Box>
															))}
														</Box>
													</Grid>
												</Grid>
											</Grid>

											<Grid item xs={1} sm={1} md={1.5}></Grid>
										</Grid>
									</AccordionDetails>
								</Accordion>
							</AppBar>
						</ThemeProvider>
					) : (
						<></>
					)}
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	is_footer_on: state.controllers.is_footer_on,
});
export default connect(mapStateToProps, { set_footer_on })(Footer);
