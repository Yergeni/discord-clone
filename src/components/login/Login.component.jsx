import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.conf";

import { Button } from "@material-ui/core";

import DiscordLogo from '../../assets/discord-logo-2015.png'

import "./Login.styles.css";

const Login = () => {
	const handleSignIn = () => {
		// The user is handle by the listening in the App.js component
		signInWithGoogle().catch((error) => {
			console.error("ERROR SIGN IN WITH GOOGLE PROVIDER >>> ", error);
		});
	};

	return (
		<div className="login">
			<div className="login__logo">
				<img
					src={DiscordLogo}
					// src={process.env.PUBLIC_URL + '/discord-logo-2015.png'}
					alt="Discord Logo"
				/>
			</div>

			<Button onClick={handleSignIn}>Sign in with Google</Button>
		</div>
	);
};

export default Login;
