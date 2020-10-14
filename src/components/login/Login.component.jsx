import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.conf";

import { Button } from "@material-ui/core";

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
					src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
					alt="Discord Logo"
				/>
			</div>

			<Button onClick={handleSignIn}>Sign in with Google</Button>
		</div>
	);
};

export default Login;
