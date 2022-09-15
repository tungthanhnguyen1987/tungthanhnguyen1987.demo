import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Popup, Marker, LayersControl } from "react-leaflet";
import { Icon } from "leaflet";
//import * as parkData from "../../data/skateboard-parks.json";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import anhnha from "../../assets/images/nhadep.png";
import anhdep from "../../assets/images/anhdep.jpg";
import { connect } from "react-redux";
import { getPositionMarker } from "../../redux/actions/controllers";
import { Button, Typography } from "@mui/material";
export const icon = new Icon({
	iconUrl: "/nhatro.svg",
	iconSize: [25, 25],
});
export function MarkerLocationPosition({ position, addr }) {
	if (!addr) {
		addr = "18-Phạm Hùng-Nam Từ Liêm-Hà Nội";
	}
	return (
		<>
			{position === null ? null : (
				<Marker position={position} icon={icon}>
					<Popup>
						<div>
							<h4>Tin mẫu</h4>
							<p>{addr}</p>
							<p>Nội dung chi tiết phòng của bạn sẽ được trích dẫn tại đây</p>
							<img src={anhnha} alt='' width={300} height={200}></img>
						</div>
					</Popup>
				</Marker>
			)}
		</>
	);
}

//Hàm này lấy tọa độ dựa trên redux biến toàn cục
// Sau khi lấy tọa độ biến toàn cục, sử dụng hàm để gửi toàn bộ dữ liệu thu được qua API
export function MarkerOnClick_NhapThongTinPhongTro({ m, onClick }) {
	const [markers, setMarkers] = useState([]);
	const [latr, setLat] = useState();
	const [longr, setLongr] = useState();
	useMapEvents({
		click(e) {
			const newMarker = e.latlng;
			setMarkers([newMarker]);
			m([newMarker]);
			setLat(e.latlng.lat);
			setLongr(e.latlng.lng);
		},
	});
	return (
		<React.Fragment sx={{ marginTop: "10vh" }}>
			{markers &&
				markers.map((marker) => (
					<Marker position={marker} icon={icon}>
						<Popup>
							<div>
								<h4>(MẪU) PHÒNG TRỌ</h4>
								<p>(Địa chỉ) 18 Lê Văn Duyệt, phường 4, quận Tân Bình, TP HCM</p>

								<p>
									(Nội dung chi tiết và ảnh sẽ được hiển thị nếu có phòng trống) <br />
									Điều hòa nóng lạnh, full đồ, wifi free, điện 3000/số, nước 5000đ/khối. Không chung chủ, giờ giấc thoải mái
								</p>
								<img src={anhdep} alt='' width={300} height={200}></img>
								<p>
									Đây là tọa độ của bạn, chúng tôi sẽ không hiển thị thông tin này <br />
									Vĩ độ: {latr}. <br />
									Kinh độ: {longr}
									<br />
								</p>
								<Button onClick={onClick}>XÁC NHẬN TỌA ĐỘ</Button>
							</div>
						</Popup>
					</Marker>
				))}
			;
		</React.Fragment>
	);
}
export function MarkerOnClick() {
	const [markers, setMarkers] = useState([]);
	useMapEvents({
		click(e) {
			const newMarker = e.latlng;

			//setMarkers([...markers, newMarker]); //câu này dùng đánh dấu hàng loạt điểm
			setMarkers([newMarker]); // đánh dấu chỉ 1 điểm, click sang điểm khác thì mất điểm cũ
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
		},
		//click(e) {
		// setState your coords here
		// coords exist in "e.latlng.lat" and "e.latlng.lng"

		//},
	});

	return (
		<React.Fragment sx={{ marginTop: "10vh" }}>
			{markers &&
				markers.map((marker) => (
					<Marker position={marker} icon={icon}>
						<Popup>
							<div>
								<h4>Điểm click của bạn</h4>
								<p>18 Lê Văn Duyệt, phường 4, quận Tân Bình, TP HCM</p>
								<p>Điều hòa nóng lạnh, full đồ, wifi free, điện 3000/số, nước 5000đ/khối. Không chung chủ, giờ giấc thoải mái</p>
								<img src={anhdep} alt='' width={300} height={200}></img>
							</div>
						</Popup>
					</Marker>
				))}
			;
		</React.Fragment>
	);
}
export function DisplayData({ parkData }) {
	return (
		<>
			{parkData.features.map((park) => (
				<Marker key={park.properties.PARK_ID} position={[park.geometry.coordinates[1], park.geometry.coordinates[0]]} icon={icon}>
					<Popup>
						<div>
							<h2>{park.properties.NAME}</h2>
							<p>{park.properties.DESCRIPTIO}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</>
	);
}
