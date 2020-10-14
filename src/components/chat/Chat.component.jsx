import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { selectCurrentChannel } from "../../redux/features/appSlice";

import ChatHeader from "../chat-header/ChatHeader.component";
import Message from "../message/Message.component";

import {
	AddCircle,
	CardGiftcard,
	EmojiEmotions,
	Gif,
} from "@material-ui/icons";

// Firestore
import firestore from "../../firebase/firebase.conf";
import firebase from "firebase/app";

import "./Chat.styles.css";

const Chat = () => {
	const user = useSelector(selectUser);
	const currentChannel = useSelector(selectCurrentChannel);

	const [typedMessage, setTypedMessage] = useState("");
	const [messages, setMessages] = useState([]); // List of messages

	// LOAD THE CHANNEL LIST FROM DB
	useEffect(() => {
		let unbsubscribe = null;

		if (currentChannel.id) {
			unbsubscribe = firestore
				.collection("channels")
				.doc(currentChannel.id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}

		return () => unbsubscribe && unbsubscribe();
	}, [currentChannel]);

	// HANDLE SEND MESSAGE
	const sendMessage = (event) => {
		event.preventDefault();
		// console.log(event.keyCode)
		if (event.keyCode === 13) {
			// console.log("ENTER KEY WAS FIRE")
			try {
				// Save the messsages to DB
				firestore
					.collection("channels")
					.doc(currentChannel.id)
					.collection("messages")
					.add({
						timestamp: firebase.firestore.FieldValue.serverTimestamp(), // The server timestamp
						message: typedMessage,
						user: user,
					});

				setTypedMessage("");
			} catch (error) {
				console.error("ERROR SENDING MESSAGE >>> ", error);
			}
		}
	};

	return (
		<div className="chat">
			<ChatHeader channelName={currentChannel.name} />

			{/* CHAT MESSAGES SECTION */}
			<div className="chat__messages">
				{messages.map(({ message, timestamp, user }) => (
					<Message
						key={timestamp}
						message={message}
						timestamp={timestamp}
						userDisplayName={user.name}
						avatarPhoto={user.photo}
					/>
				))}
			</div>

			{/* CHAT INPUT SECTION */}
			<div className="chat__input">
				<AddCircle fontSize="large" />
				<form>
					<textarea
						value={typedMessage}
						onChange={(e) => setTypedMessage(e.target.value)}
						disabled={!currentChannel.id}
						type="text"
						placeholder={
							!currentChannel.name
								? "Select a channel"
								: `Message for #${currentChannel.name}`
						}
						onKeyUp={sendMessage}
					/>
					<button
						disabled={!currentChannel.id}
						className="chat__inputButton"
						type="submit"
						// onClick={sendMessage}
					>
						Send Message
					</button>
				</form>

				<div className="chat__inputIcons">
					<CardGiftcard fontSize="large" />
					<Gif fontSize="large" />
					<EmojiEmotions fontSize="large" />
				</div>
			</div>
		</div>
	);
};

export default Chat;
