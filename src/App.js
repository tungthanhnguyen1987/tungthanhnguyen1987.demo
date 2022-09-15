import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeMap from "./components/HomeMap/HomeMap";
import Header from "./components/AZ/Header";
import HuongDan from "./components/Pages/HuongDan";
import Footer from "./components/AZ/Footer";
import Login from "./components/User/Login";
import Dangky from "./components/User/Signup";
import HomeList from "./components/HomeList/HomeList";
import TaoNhaTro from "./components/Pages/TaoNhaTro";
import DongGopDuLieu from "./components/Pages/DongGopDuLieu";
import Activate from "./components/User/Activate";
import ResetPassword from "./components/User/ResetPassword";
import ResetPasswordConfirm from "./components/User/ResetPasswordConfirm";
import Facebook from "./components/User/Facebook";
import Google from "./components/User/Google";
import QuanLyTinDang from "./components/Pages/Quanlytindang";
import ThongTinTaiKhoan from "./components/Pages/Thongtintaikhoan";
import ChinhSachVaGia from "./components/Pages/Chinhsachvagia";
import AboutUs from "./components/Pages/AboutUs";

//import BannerClass from "./components/HomeList/CarouselClass";
//import BannerFunction from "./components/HomeList/CarouselFunction";
function App() {
	/* Nếu muốn thử nghiệm Banner 
	const items = [
		{
			Name: "Pizza begin",
			Image: "https://source.unsplash.com/featured/?macbook",
			contentPosition: "left",
			Items: [
				{
					Name: "Macbook Pro",
					Image: "https://source.unsplash.com/featured/?macbook",
				},
				{
					Name: "iPhone",
					Image: "https://source.unsplash.com/featured/?iphone",
				},
			],
		},
		{
			Name: "Home Appliances",
			Caption: "Say no to manual home labour!",
			contentPosition: "middle",
			Items: [
				{
					Name: "Washing Machine WX9102",
					Image: "https://source.unsplash.com/featured/?washingmachine",
				},
				{
					Name: "Learus Vacuum Cleaner",
					Image: "https://source.unsplash.com/featured/?vacuum,cleaner",
				},
			],
		},
		{
			Name: "Decoratives",
			Caption: "Give style and color to your living room!",
			contentPosition: "right",
			Items: [
				{
					Name: "Living Room Lamp",
					Image: "https://source.unsplash.com/featured/?lamp",
				},
				{
					Name: "Floral Vase",
					Image: "https://source.unsplash.com/featured/?vase",
				},
			],
		},
	];*/
	return (
		<BrowserRouter>
			<Header />
			{/*<BannerFunction items={items} />*/}

			<Routes>
				<Route path='' element={<HomeList />} />
				<Route path='/homemap' element={<HomeMap />} />
				<Route path='/homelist' element={<HomeList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dangky' element={<Dangky />} />
				<Route path='/taonhatro' element={<TaoNhaTro />} />
				<Route path='/donggopdulieu' element={<DongGopDuLieu />} />
				<Route path='/huongdan' element={<HuongDan />} />
				<Route path='/quanlytindang' element={<QuanLyTinDang />} />
				<Route path='/thongtintaikhoan' element={<ThongTinTaiKhoan />} />
				<Route path='/chinhsachvagia' element={<ChinhSachVaGia />} />
				<Route path='/facebook' element={<Facebook />} />
				<Route path='/google' element={<Google />} />
				<Route path='/aboutus' element={<AboutUs />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
				<Route path='/activate/:uid/:token' element={<Activate />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
