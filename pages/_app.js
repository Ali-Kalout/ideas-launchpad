import React, { useEffect } from 'react';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css';
import './../styles/globals.css';
import decode from "jwt-decode";
import delLocalStorage from './../utils/delLocalStorage';
import Navbar from './../components/layout/Navbar';

// TODO: 'NEW' and 'ONGOING' selection with 'ONGOING' having link to a github repo

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (localStorage?.getItem('profile') && Router.pathname === '/auth') {
			Router?.push('/');
			const decodedData = decode(JSON.parse(localStorage.getItem('profile'))?.profile?.token);

			if (decodedData?.exp * 1000 < new Date().getTime())
				delLocalStorage();
		} else if (!localStorage?.getItem('profile')) {
			Router.push('/auth');
		}
	}, []);

	return (
		<>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp
