import {
	DISPLAY_FOOTER_OFF,
	DISPLAY_FOOTER_ON,
	DISPLAY_HEADER_OFF,
	DISPLAY_HEADER_ON,
	GET_POSITION_MARKER,
	XAC_NHAN_TOA_DO,
	XAC_NHAN_TOA_DO_THAT_BAI,
} from "./types";
import axios from "axios";

export const set_header_off = () => async (dispatch) => {
	dispatch({
		type: DISPLAY_HEADER_OFF,
	});
};
export const set_header_on = () => async (dispatch) => {
	dispatch({
		type: DISPLAY_HEADER_ON,
	});
};
export const set_footer_off = () => async (dispatch) => {
	dispatch({
		type: DISPLAY_FOOTER_OFF,
	});
};
export const set_footer_on = () => async (dispatch) => {
	dispatch({
		type: DISPLAY_FOOTER_ON,
	});
};
export const getPositionMarker = (toaDo) => async (dispatch) => {
	dispatch({
		type: GET_POSITION_MARKER,
		payload: toaDo,
	});
};
export const onXacNhanToaDo = (toaDo, diaChiGui, soPhongCo, dienTich, loaiPhong) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ toaDo, diaChiGui, soPhongCo, dienTich, loaiPhong });
	try {
		//const res = await axios.post("http://localhost:8000/create/phongtro/new/", body, config);
		console.log(toaDo, diaChiGui, soPhongCo, dienTich, loaiPhong);
		dispatch({
			type: XAC_NHAN_TOA_DO,
			//payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: XAC_NHAN_TOA_DO_THAT_BAI,
		});
	}
};
