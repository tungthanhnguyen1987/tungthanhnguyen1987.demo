import {
	DISPLAY_FOOTER_OFF,
	DISPLAY_FOOTER_ON,
	DISPLAY_HEADER_OFF,
	DISPLAY_HEADER_ON,
	GET_POSITION_MARKER,
	RESET_TRANG_NHAP_TIN,
	XAC_NHAN_TOA_DO,
	XAC_NHAN_TOA_DO_THAT_BAI,
} from "../actions/types";

const initialState = {
	is_header_on: true,
	is_footer_on: true,
	toaDo: [21.054814937118724, 105.82073985268873],
	guiThongTinPhongTroThanhCong: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case DISPLAY_FOOTER_OFF:
			return {
				...state,
				is_footer_on: false,
			};
		case DISPLAY_FOOTER_ON:
			return {
				...state,
				is_footer_on: true,
			};
		case DISPLAY_HEADER_OFF:
			return {
				...state,
				is_header_on: false,
			};
		case DISPLAY_HEADER_ON:
			return {
				...state,
				is_header_on: true,
			};
		case GET_POSITION_MARKER:
			return {
				...state,
				toaDo: payload,
			};
		case XAC_NHAN_TOA_DO:
			return {
				...state,
				guiThongTinPhongTroThanhCong: true,
				hienThiTrangNhapTinPhongTro: false,
			};
		case XAC_NHAN_TOA_DO_THAT_BAI:
			return {
				...state,
				guiThongTinPhongTroThanhCong: false,
			};

		default:
			return state;
	}
}
