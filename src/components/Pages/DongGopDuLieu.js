import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Container, TextField, Typography } from "@mui/material";
import GenSelector from "./GenSelector";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import { MarkerLocationPosition, icon, MarkerOnClick_NhapThongTinPhongTro } from "../MapFunctions/mapfunctions";
import * as data from "../../data/DuLieuHanhChinh.json";
import anhdep from "../../assets/images/anhdep.jpg";
import { getPositionMarker, onXacNhanToaDo, set_header_on } from "../../redux/actions/controllers";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

//const Item = styled(Paper)(({ theme }) => ({
//	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//	...theme.typography.body2,
//	padding: theme.spacing(1),
//	textAlign: "center",
//	color: theme.palette.text.secondary,
//}));

const theme = createTheme();
const InputField = [
	"Loại nhà",
	"Số nhà",
	"Tên đường",
	"Phường/Xã",
	"Quận/Huyện",
	"Tỉnh/Thành phố",
	"Diện tích",
	//"Chủ nhà", do người dùng tạo là chủ nhà, lấy lại thông số
	//"Created_at", thông số thời gian backend tự lấy
	//"Updated_at", thông số thời gian backend tự lấy
	//"is_validated", xác thực do admin nhập
	"Ảnh",
	"Video",
	"Vĩ độ", //2 trường này tự lấy bằng leaflet, hiển thị nhưng không cho sửa
	"Kinh độ", //
];

function DongGopDuLieu({ toaDo, getPositionMarker, set_header_on, onXacNhanToaDo, xacNhanToaDoThanhCong }) {
	const [quyetDinhNhap, setQuyetDinhNhap] = useState(false);
	const [chucNangXacNhanToaDo, setChucNangXNTD] = useState(false); //Ban đầu, chức năng xác nhận tọa độ bị cấm
	const [map, setMap] = useState(null);
	const [toaDoPhong, setToaDoPhong] = useState(toaDo);
	const [diaChiPhong, setDiaChiPhong] = useState("");
	const [tinh, setTinh] = useState("Hà Nội");
	const [quan, setQuan] = useState("Nam Từ Liêm");
	const [phuong, setPhuong] = useState("Mỹ Đình 2");
	const [duong, setDuong] = useState("Nguyễn Hoàng");
	const [soNha, setSoNha] = useState("81");
	const [editDiaChi, setEditDiaChi] = useState(false);
	const [diaChiDaSua, setDiaChiDaSua] = useState("");
	const [position, setPosition] = useState(null);
	const [hienThiFormNhap, setHienThiFormNhap] = useState(true);
	const [tatHienThiViTriHanhChinh, setTatHienThiViTriHanhChinh] = useState(false);
	const [loaiDiaDiem, setLoaiDiaDiem] = useState("loai");
	const [tenDiaDiem, setTenDiaDiem] = useState("Tiểu Học Nguyễn Du");
	const [hienThiTrangNhapTinPhongTro, SetHienThiTrangNhapTinPhongTro] = useState(true);
	const [hienThiNhapAnhVaVideo, setHienThiNhapAnhVaVideo] = useState(true);
	let x = [{ lat: 20.0 }, { lng: 105.0 }];
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		setToaDoPhong(toaDo); // đánh dấu chỉ 1 điểm, click sang điểm khác thì mất điểm cũ
		console.log(toaDoPhong);
	}, [toaDo]);
	useEffect(() => {
		setLoaiDiaDiem(loaiDiaDiem);
		setTenDiaDiem(tenDiaDiem);
	}, [loaiDiaDiem, tenDiaDiem]);
	useEffect(() => {
		if (!map) return;

		L.easyButton("fa-crosshairs fa-lg", () => {
			map.locate().on("locationfound", function (e) {
				setPosition(e.latlng);
				map.panTo(e.latlng, map.getZoom());
				//map.flyTo(e.latlng, map.getZoom()); để chạy từ từ
			});
		}).addTo(map);
	}, [map]);

	useEffect(() => {
		if (!map) return;
		for (var i = 0; i < data.tinhtp.length; i++) {
			if (data.tinhtp[i].id === tinh) {
				x.lat = data.tinhtp[i].vido;
				x.lng = data.tinhtp[i].kinhdo;
			}
		}
		for (var i = 0; i < data.tinhtp.length; i++) {
			if (data.tinhtp[i].id === tinh) {
				for (var j = 0; j < data.tinhtp[i].quanhuyen.length; j++) {
					if (data.tinhtp[i].quanhuyen[j].id === quan) {
						x.lat = data.tinhtp[i].quanhuyen[j].vido;
						x.lng = data.tinhtp[i].quanhuyen[j].kinhdo;
					}
				}
			}
		}
		for (var i = 0; i < data.tinhtp.length; i++) {
			if (data.tinhtp[i].id === tinh) {
				for (var j = 0; j < data.tinhtp[i].quanhuyen.length; j++) {
					if (data.tinhtp[i].quanhuyen[j].id === quan) {
						for (var k = 0; k < data.tinhtp[i].quanhuyen[j].phuongxa.length; k++) {
							if (data.tinhtp[i].quanhuyen[j].phuongxa[k].id === phuong) {
								x.lat = data.tinhtp[i].quanhuyen[j].phuongxa[k].vido;
								x.lng = data.tinhtp[i].quanhuyen[j].phuongxa[k].kinhdo;
							}
						}
					}
				}
			}
		}
		setPosition(x);
		map.panTo(x, map.getZoom());
	}, [tinh, quan, phuong]);
	useEffect(() => {
		setDiaChiDaSua(diaChiDaSua);
	}, [diaChiDaSua]);

	const editAddress = (e) => {
		e.preventDefault();
		var la = soNha + "-" + duong + "-" + phuong + "-" + quan + "-" + tinh;
		setDiaChiDaSua(la);
		setEditDiaChi(true);
	};

	useEffect(() => {
		setTinh(tinh);
		setQuan(quan);
		setPhuong(phuong);
	}, [tinh, quan, phuong]);
	useEffect(() => {
		setDuong(duong);
		setSoNha(soNha);
	}, [duong, soNha]);

	const onSubmit = (e) => {
		e.preventDefault();
		var la = soNha + "-" + duong + "-" + phuong + "-" + quan + "-" + tinh;
		if (diaChiDaSua !== "") {
			setDiaChiPhong(diaChiDaSua);
		} else {
			setDiaChiPhong(la);
		}
		setHienThiFormNhap(false);
		setTatHienThiViTriHanhChinh(true);
		setChucNangXNTD(true);
		//console.log("edlabel:", edlabel);
		//console.log(la);
	};
	function btnQuayLaiNhap() {
		setHienThiFormNhap(true);
		setTatHienThiViTriHanhChinh(false);
		setChucNangXNTD(false);
	}
	function QuayLaiBanDo() {
		setHienThiNhapAnhVaVideo(true);
		set_header_on();
	}

	return (
		<ThemeProvider theme={theme}>
			{quyetDinhNhap ? (
				<>
					{hienThiTrangNhapTinPhongTro ? (
						<Grid container spacing={2}>
							<Grid item xs={12} md={3}>
								{hienThiFormNhap && (
									<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh" }}>
										<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
											<Typography variant='h6'>NHẬP THÔNG TIN ĐỊA ĐIỂM</Typography>

											<Box component='form' noValidate>
												<Grid container spacing={2}>
													<Grid item xs={12}>
														<GenSelector request={"loaidd"} onChange={(e) => setLoaiDiaDiem(e.target.value)} />
													</Grid>
													<Grid item xs={12}>
														<TextField
															sx={{ mt: 2, mb: 2 }}
															required
															fullWidth
															id='tendiadiem'
															label='Tên Địa điểm'
															name='tendiadiem'
															autoComplete='family-name'
															onChange={(e) => setTenDiaDiem(e.target.value)}
														/>
													</Grid>
												</Grid>

												<GenSelector request={"tinh"} onChange={(e) => setTinh(e.target.value)} helptext='' />
												<GenSelector request={"quan"} tentinh={tinh} onChange={(e) => setQuan(e.target.value)} helptext='' />
												<GenSelector request={"phuong"} tentinh={tinh} tenquan={quan} onChange={(e) => setPhuong(e.target.value)} helptext='' />
												<GenSelector request={"duong"} tentinh={tinh} tenquan={quan} onChange={(e) => setDuong(e.target.value)} helptext='' />
												<TextField
													variant='outlined'
													sx={{ mt: 0, mb: 2 }}
													required
													fullWidth
													id='text'
													label='Nhập số nhà hoặc phần còn lại của địa chỉ'
													name='Số nhà'
													autoComplete=''
													value={soNha}
													autoFocus
													onChange={(e) => setSoNha(e.target.value)}
												></TextField>

												{editDiaChi ? (
													<>
														<Typography>Sửa thành địa chỉ chính xác của bạn:</Typography>
														<TextField multiline fullWidth value={diaChiDaSua} onChange={(e) => setDiaChiDaSua(e.target.value)}></TextField>
													</>
												) : (
													<>
														<Typography sx={{ fontSize: "2.1vmin" }}>
															Nếu dữ liệu bị thiếu làm cho bạn không chọn được đúng địa chỉ. Mời nhấn vào địa chỉ bạn vừa nhập để sửa:
														</Typography>
														<Button onClick={editAddress}>
															<Typography>
																{soNha} - {duong} - {phuong} - {quan} - {tinh}
															</Typography>
														</Button>
														<Typography sx={{ mt: 2 }}>HOẶC:</Typography>
													</>
												)}

												<Button onClick={(e) => onSubmit(e)} fullWidth variant='contained' sx={{ mt: 1, mb: 4 }}>
													XÁC NHẬN ĐỊA CHỈ
												</Button>
											</Box>
										</Box>
									</Container>
								)}
								{!hienThiFormNhap && (
									<Container component='main' maxWidth='xs' sx={{ marginTop: "60vh" }}>
										<Typography variant='h3'>Cảm ơn bạn!</Typography>
										<Typography>Địa điểm bạn đã nhập là:</Typography>
										<Typography sx={{ mt: 3, mb: 4, color: "#1e656d", fontWeight: "bold" }}>
											{loaiDiaDiem} {tenDiaDiem}, {diaChiPhong}
										</Typography>
										<Typography>
											Tiếp theo, hãy xem trên bản đồ, click vào vị trí chính xác của địa điểm vừa nhập, khi biểu tượng ngôi nhà hiện lên, tiếp tục
											click vào{" "}
											<Typography variant='a' sx={{ color: "red" }}>
												"Xác nhận tọa độ"
											</Typography>
											, chúng tôi sẽ ghi nhận tọa độ địa điểm bạn vừa nhập
										</Typography>
										<Button onClick={btnQuayLaiNhap}>Quay lại</Button>
									</Container>
								)}
							</Grid>
							<Grid item xs={12} md={9}>
								<Container component='main' sx={{ marginTop: "20vh", maxWidth: "100%" }}>
									<MapContainer center={[21.0468, 105.825]} zoom={15} closePopupOnClick whenCreated={setMap}>
										<LayersControl position='topright'>
											<LayersControl.Overlay checked name='Bản đồ OpenStreetMap'>
												<TileLayer
													//OpenStreetMap center={[45.4, -75.7]}
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
													url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
													//url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
													//Google
													//url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' //satellite
													//url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' //street
													//url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' //hybrid
													//url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' //địa hình terrain
													//maxZoom={20} // for google
													//subdomains={["mt0", "mt1", "mt2", "mt3"]} //for google
												/>
											</LayersControl.Overlay>

											<LayersControl.Overlay name='Bản đồ vệ tinh Esri'>
												<TileLayer
													//Esri.WorldImagery
													url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
													attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
												/>
											</LayersControl.Overlay>
											{!tatHienThiViTriHanhChinh && <MarkerLocationPosition position={position} addr={diaChiPhong} />}
											{chucNangXacNhanToaDo && (
												<MarkerOnClick_NhapThongTinPhongTro
													m={getPositionMarker}
													onClick={() => SetHienThiTrangNhapTinPhongTro(false)}
													//onClick={onXacNhanToaDo(toaDo, diaChiPhong, soLuongCan, dienTich, loaiPhong)}
												/>
											)}
										</LayersControl>
									</MapContainer>
								</Container>
							</Grid>
						</Grid>
					) : (
						<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh" }}>
							<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
								{hienThiNhapAnhVaVideo ? (
									<Box>
										<Typography variant='h5' sx={{ marginTop: "50vh" }}>
											CẢM ƠN BẠN ĐÃ ĐÓNG GÓP ĐỊA ĐIỂM CHO MAP TRỌ
										</Typography>
										<Typography>Bây giờ bạn có thể</Typography>
										<Button variant='contained' component='label' color='primary'>
											{" "}
											<AddIcon /> TẢI ẢNH LÊN
											<input type='file' hidden />
										</Button>

										<Typography>Để hoàn tất công việc, hãy nhấn "Kết thúc"</Typography>

										<Button onClick={() => setHienThiNhapAnhVaVideo(false)} fullWidth variant='contained' sx={{ mt: 1, mb: 4 }}>
											KẾT THÚC
										</Button>
										<Button onClick={() => SetHienThiTrangNhapTinPhongTro(true)}>Quay lại trang trước</Button>
									</Box>
								) : (
									<Box>
										<Typography>TIẾP THEO</Typography>
										<Typography>Bạn đã nhập thành công địa điểm của mình. Bây giờ bạn có thể</Typography>
										<Button fullWidth variant='contained' sx={{ mt: 1, mb: 4 }} onClick={() => SetHienThiTrangNhapTinPhongTro(true)}>
											XEM LẠI HỒ SƠ VÀ CHỈNH SỬA THÔNG TIN
										</Button>

										<Typography>Bạn muốn xem lại chính sách dữ liệu và các dịch vụ của MAP TRỌ ?</Typography>
										<Button fullWidth variant='contained' sx={{ mt: 1, mb: 4 }}>
											XEM THÊM TẠI ĐÂY
										</Button>
										<Button onClick={() => setHienThiNhapAnhVaVideo(true)}>Quay lại trang trước</Button>
									</Box>
								)}
							</Box>
						</Container>
					)}
				</>
			) : (
				<Container component='main' maxWidth='xs' sx={{ marginTop: "20vh", height: "80vh" }}>
					<Box sx={{ marginTop: "5vh", textAlign: "center" }}>
						<Typography variant='h6' sx={{ marginBottom: 3 }}>
							TRANG ĐÓNG GÓP DỮ LIỆU ĐỊA ĐIỂM
						</Typography>
						<Typography sx={{ marginBottom: 3 }}>
							Bạn muốn thêm các địa điểm? Đánh dấu các địa điểm trên bản đồ? Hãy đóng góp dữ liệu tại mục này. <br />
							Vui lòng{" "}
							<Typography component={Link} to='/login'>
								ĐĂNG NHẬP
							</Typography>
							, hoặc <NavLink to='/signup'>ĐĂNG KÝ</NavLink> - nếu bạn chưa có tài khoản - để có thể nhập thông tin.
							<br />
							Nếu bạn đã đăng nhập, vui lòng bỏ qua
						</Typography>
						<Typography>
							Nếu bạn có nhà cho thuê và muốn nhập địa điểm nhà cho thuê của bạn, vui lòng sử dụng tính năng tạo phòng cho thuê dành cho tài khoản chủ
							nhà
						</Typography>

						<Button
							onClick={() => {
								setQuyetDinhNhap(true);
							}}
							fullWidth
							variant='contained'
							sx={{ mt: 1, mb: 4 }}
						>
							TÔI ĐÃ HIỂU, TIẾP TỤC NHẬP THÔNG TIN
						</Button>

						<Button component={Link} to='/homemap' onClick={QuayLaiBanDo}>
							QUAY LẠI BẢN ĐỒ
							{/*<NavLink to='/homemap' className='navlink'>
								Quay lại trang trước
						</NavLink>*/}
						</Button>
						<Button>CHÍNH SÁCH DỮ LIỆU MAP TRỌ</Button>
					</Box>
				</Container>
			)}
		</ThemeProvider>
	);
}
const mapStateToProps = (state) => ({
	toaDo: state.controllers.toaDo,
	xacNhanToaDoThanhCong: state.controllers.guiThongTinPhongTroThanhCong,
	is_header_on: state.controllers.is_header_on,
});
export default connect(mapStateToProps, { getPositionMarker, onXacNhanToaDo, set_header_on })(DongGopDuLieu);
