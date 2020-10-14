import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./redux/features/userSlice";

import Login from "./components/login/Login.component";
import Sidebar from "./components/sidebar/Sidebar.component";
import Chat from "./components/chat/Chat.component";

// Auth from firebase
import { auth } from "./firebase/firebase.conf";

import "./App.css";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		// Listening for state changes in the application
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// The user is logged in
				// console.log("The user is >>> ", authUser);
				dispatch(
					login({
						userId: authUser.uid,
						name: authUser.displayName,
						email: authUser.email,
						photo: authUser.photoURL,
					})
				);
			} else {
				// The usr is logged out
				dispatch(login());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<div className="app">
			{user ? (
				<>
					{/* SIDEBAR */}
					<Sidebar />

					{/* CHAT */}
					<Chat />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
