import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/system";
import { Grid, Icon, ThemeProvider } from "@mui/material";
import { Ptheme } from "./Ptheme";
import LogoGactro from "../../assets/images/Logogactro.png";
import LogoGactro2 from "../../assets/images/Logogactro2.png";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { NavLink, Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { connect } from "react-redux";
import { set_header_off, set_header_on, set_footer_off, set_footer_on } from "../../redux/actions/controllers";
import ChaletIcon from "@mui/icons-material/Chalet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VillaIcon from "@mui/icons-material/Villa";
import BusinessIcon from "@mui/icons-material/Business";
import HailIcon from "@mui/icons-material/Hail";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";

let user = [{ first_name: "Tùng", last_name: "Nguyễn Thanh" }];
const pages = [
	{ id: 1, text: "Phòng trọ", link: "/login", icon: <ChaletIcon fontSize='small' /> },
	{ id: 2, text: "Chung cư", link: "/login", icon: <ApartmentIcon fontSize='small' /> },
	{ id: 3, text: "Nhà nguyên căn", link: "/login", icon: <VillaIcon fontSize='small' /> },
	{ id: 4, text: "Mặt bằng", link: "/login", icon: <BusinessIcon fontSize='small' /> },
	{ id: 5, text: "Người ở ghép", link: "/login", icon: <HailIcon fontSize='small' /> },
	{ id: 6, text: "Dịch vụ", link: "/login", icon: <ReduceCapacityIcon fontSize='small' /> },
];
const settingsfirst = [
	{ id: 1, text: "Đăng nhập", link: "/login" },
	{ id: 2, text: "Tạo tài khoản", link: "/dangky" },
	{ id: 3, text: "Hướng dẫn", link: "/huongdan" },
];
const settings = [
	{ id: 1, text: "Thông tin tài khoản", link: "/thongtintaikhoan" },
	{ id: 2, text: "Tạo nhà trọ", link: "/taonhatro" },
	{ id: 2, text: "Đăng tin", link: "/dangtin" },
	{ id: 3, text: "Chính sách và giá", link: "/chinhsach" },
	{ id: 4, text: "Quản lý tin đăng", link: "/quanlytindang" },
	{ id: 5, text: "Lịch sử nạp tiền", link: "/lichsunaptien" },
	{ id: 6, text: "Lịch sử thanh toán", link: "/lichsuthanhtoan" },
	{ id: 7, text: "Trang thanh toán", link: "/trangthanhtoan" },
	{ id: 8, text: "Hướng dẫn", link: "/huongdan" },
	{ id: 9, text: "Đăng xuất", link: "/logout" },
];
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.info.light, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.info.light, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100 vmin",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",

	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("md")]: {
			width: "35ch", //20ch là đủ không gian cho 20 chữ 0
			//width: "10em", //em là độ rộng chữ M
		},
	},
}));
export const useViewPort = () => {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
			window.addEventListener("resize", handleWindowResize);
			return () => window.removeEventListener("resize", handleWindowResize);
		};
	}, []);
	return { width };
};
function Header({ is_header_on, isAuthenticated, set_header_off, set_header_on, set_footer_on, set_footer_off }) {
	const viewPort = useViewPort();
	const isMobile = viewPort.width <= 800;
	const [hienThiSearchInput, setHienThiSearchInput] = useState(false);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [value, setValue] = useState(0);
	const [hienThiMap, setHienThiMap] = useState(true);

	useEffect(() => {
		setHienThiMap(hienThiMap);
	}, [hienThiMap]);
	const handleChangeSco = (newValue) => {
		setValue(newValue);
	};
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = (e) => {
		setAnchorElUser(null);
		set_header_off();
		set_footer_on();
	};
	const Logos = styled("Typography")({
		fontFamily: "Roboto",
		color: "#f1f3ce",
	});
	useEffect(() => {});
	function tatHienThiMap() {
		setHienThiMap(false);
		set_header_on();
		set_footer_off();
	}
	function batHienThiMap() {
		setHienThiMap(true);
		set_header_on();
		set_footer_on();
	}
	function handleDuLieu() {
		set_header_off();
		set_footer_on();
	}
	return (
		<>
			<ThemeProvider theme={Ptheme}>
				<AppBar position='fixed' textAlign='center'>
					<Grid container spacing={0}>
						<Grid item xs={0} sm={1}></Grid>
						<Grid item xs={2}>
							<Box sx={{ textAlign: "start", marginTop: "2vmin" }}>
								<Logos sx={{ display: { xs: "none", md: "flex" } }}>
									<img src={LogoGactro} alt='' height='30vmin' />
								</Logos>
								<Logos sx={{ display: { xs: "flex", md: "none" } }}>
									<img src={LogoGactro2} alt='' height='30vmin' />
								</Logos>
							</Box>
						</Grid>
						<Grid item xs={8} sm={6}>
							<Toolbar sx={{ justifyContent: "center" }}>
								{hienThiSearchInput ? (
									<></>
								) : (
									<>
										<IconButton>
											<FilterAltIcon />
											{!isMobile && <Typography sx={{ color: "#1e656d", fontSize: "14" }}>Bộ lọc</Typography>}
										</IconButton>
										{hienThiMap ? (
											<IconButton component={Link} to='/homemap' onClick={tatHienThiMap}>
												<MapTwoToneIcon />
												{!isMobile && <Typography sx={{ color: "#1e656d", fontSize: "14" }}>Bản đồ</Typography>}
											</IconButton>
										) : (
											<IconButton component={Link} to='/homelist' onClick={batHienThiMap}>
												<ListAltOutlinedIcon />
												{!isMobile && <Typography sx={{ color: "#1e656d", fontSize: "14" }}>Danh sách</Typography>}
											</IconButton>
										)}

										<IconButton component={Link} to='/donggopdulieu' onClick={handleDuLieu}>
											<AddLocationIcon />
											{!isMobile && <Typography sx={{ color: "#1e656d", fontSize: "14" }}>Dữ liệu</Typography>}
										</IconButton>
									</>
								)}

								{isMobile ? (
									<>
										{hienThiSearchInput ? (
											<React.Fragment>
												<IconButton
													onClick={() => setHienThiSearchInput(false)}
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<ArrowForwardIcon />
												</IconButton>
												<Search>
													<SearchIconWrapper>
														<SearchIcon />
													</SearchIconWrapper>
													<StyledInputBase placeholder='Tìm kiếm địa điểm' inputProps={{ "aria-label": "search" }} />
												</Search>
											</React.Fragment>
										) : (
											<IconButton
												onClick={() => setHienThiSearchInput(true)}
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<SearchIcon />
											</IconButton>
										)}
									</>
								) : (
									<Search>
										<SearchIconWrapper>
											<SearchIcon />
										</SearchIconWrapper>
										<StyledInputBase placeholder='Tìm kiếm địa điểm' inputProps={{ "aria-label": "search" }} />
									</Search>
								)}
							</Toolbar>
						</Grid>
						<Grid item xs={2}>
							<Box sx={{ textAlign: "end", marginTop: "2vmin" }}>
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										{!isAuthenticated ? (
											<>
												<Typography sx={{ display: { xs: "none", md: "flex" } }}>
													{user[0].last_name} {user[0].first_name}
													{"   "}
												</Typography>
												<Avatar alt={user[0].first_name} />
											</>
										) : (
											<>
												<Typography sx={{ display: { xs: "none", md: "flex" } }}>MENU </Typography>
												<Avatar alt='MAP TRO' src={LogoGactro} />
											</>
										)}
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{!isAuthenticated ? (
										<>
											{settings.map((setting) => (
												<MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.text)}>
													<Button component={Link} to={setting.link} sx={{ textTransform: "none", color: "#1e656d", fontWeight: "normal" }}>
														{setting.text}
													</Button>
												</MenuItem>
											))}
										</>
									) : (
										<>
											<MenuItem>TÊN BẠN LÀ GÌ?</MenuItem>
											<br />
											{settingsfirst.map((setting) => (
												<>
													<MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.text)}>
														<Button component={Link} to={setting.link} sx={{ textTransform: "none", color: "#1e656d", fontWeight: "normal" }}>
															{setting.text}
														</Button>
													</MenuItem>
												</>
											))}
										</>
									)}
								</Menu>
							</Box>
						</Grid>
						<Grid item xs={0} sm={1}></Grid>
					</Grid>
					{is_header_on && (
						<>
							{isMobile ? (
								<Tabs
									value={value}
									onChange={handleChangeSco}
									variant='scrollable'
									scrollButtons
									allowScrollButtonsMobile
									aria-label='scrollable force tabs example'
									textColor='#1e656d'
								>
									{pages.map((page) => (
										<Tab key={page.id} label={page.text} sx={{ color: "#1e656d" }} icon={page.icon} iconPosition='start'></Tab>
									))}
								</Tabs>
							) : (
								<Tabs
									value={value}
									onChange={handleChangeSco}
									centered
									scrollButtons
									allowScrollButtonsMobile
									aria-label='scrollable force tabs example'
									textColor='#1e656d'
								>
									{pages.map((page) => (
										<Tab key={page.id} label={page.text} sx={{ color: "#1e656d" }} icon={page.icon} iconPosition='start'></Tab>
									))}
								</Tabs>
							)}
						</>
					)}
				</AppBar>
			</ThemeProvider>
		</>
	);
}

const mapStateToProps = (state) => ({
	is_header_on: state.controllers.is_header_on,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { set_header_off, set_header_on, set_footer_off, set_footer_on })(Header);
