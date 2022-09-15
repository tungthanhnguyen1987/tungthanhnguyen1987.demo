import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { FormHelperText } from "@mui/material";
import * as data from "../../data/DuLieuHanhChinh.json";

function GetTenDuongByTenQuan(tinh, quan) {
	let tenduong = [];

	for (var i = 0; i < data.tinhtp.length; i++) {
		if (data.tinhtp[i].id === tinh) {
			for (var j = 0; j < data.tinhtp[i].quanhuyen.length; j++) {
				if (data.tinhtp[i].quanhuyen[j].id === quan) {
					tenduong = data.tinhtp[i].quanhuyen[j].tenduong;
				}
			}
		}
	}
	return tenduong;
}
function GetPhuongXaByTenQuan(tinh, quan) {
	let phuongxa = [];

	for (var i = 0; i < data.tinhtp.length; i++) {
		if (data.tinhtp[i].id === tinh) {
			for (var j = 0; j < data.tinhtp[i].quanhuyen.length; j++) {
				if (data.tinhtp[i].quanhuyen[j].id === quan) {
					phuongxa = data.tinhtp[i].quanhuyen[j].phuongxa;
				}
			}
		}
	}
	return phuongxa;
}
function GetQuanHuyenByTenTinh(tinh) {
	let quanhuyen = [];
	for (var i = 0; i < data.tinhtp.length; i++) {
		if (data.tinhtp[i].id === tinh) {
			quanhuyen = data.tinhtp[i].quanhuyen;
		}
	}
	return quanhuyen;
}
export default function GenSelector({ request, onChange, tentinh, tenquan, helptext }) {
	let x = [];
	let label = "";
	if (request === "tinh") {
		x = data.tinhtp;
		label = "Chọn Tỉnh/TP";
	} else if (request === "quan") {
		x = GetQuanHuyenByTenTinh(tentinh);
		label = "Chọn Quận/Huyện";
	} else if (request === "phuong") {
		x = GetPhuongXaByTenQuan(tentinh, tenquan);
		label = "Chọn Phường/Xã";
	} else if (request === "duong") {
		x = GetTenDuongByTenQuan(tentinh, tenquan);
		label = "Chọn Tên đường";
	} else if (request === "loai") {
		x = [{ id: "Phòng trọ" }, { id: "Chung cư" }, { id: "Nhà nguyên căn" }, { id: "Mặt bằng kinh doanh" }];
		label = "Chọn Loại nhà";
	} else if (request === "socan") {
		x = [
			{ id: "" },
			{ id: "1" },
			{ id: "2" },
			{ id: "3" },
			{ id: "4" },
			{ id: "5" },
			{ id: "6" },
			{ id: "7" },
			{ id: "8" },
			{ id: "9" },
			{ id: "10" },
			{ id: "11" },
			{ id: "12" },
			{ id: "13" },
			{ id: "14" },
			{ id: "15" },
			{ id: "16" },
			{ id: "17" },
			{ id: "18" },
			{ id: "19" },
			{ id: "20" },
		];
		label = "Chọn số lượng căn";
	} else if (request === "loaidd") {
		x = [
			{ id: "Trường học" },
			{ id: "Cơ quan" },
			{ id: "Khu công nghiệp" },
			{ id: "Nhà hàng" },
			{ id: "Quán cà phê" },
			{ id: "Bệnh viện" },
			{ id: "Chợ - siêu thị" },
			{ id: "Khách sạn" },
			{ id: "Công viên" },
		];
		label = "Chọn Loại Địa điểm";
	}
	return (
		<Box sx={{ minWidth: 120, mt: 2, mb: 2 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-helper-label'>{label}</InputLabel>
				<Select
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='email'
					autoFocus
					labelId='demo-simple-select-helper-label'
					id='demo-simple-select-helper'
					label={label}
					onChange={onChange}
				>
					{x.map((g) => (
						<MenuItem key={g.id} value={g.id}>
							{g.id}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>{helptext}</FormHelperText>
			</FormControl>
		</Box>
	);
}
