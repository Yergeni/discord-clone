import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";

import SidebarChannel from "../sidebar-channel/SidebarChannel.component";
import AddChannelDialog from "./AddChannelDialog";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";

import firestore, { auth } from "../../firebase/firebase.conf";

import "./Sidebar.styles.css";

const Sidebar = () => {
	const user = useSelector(selectUser);
	const [channels, setChannels] = useState([]);
	// Dialog
	const [openDialog, setOpenDialog] = useState(false);
	const [newChannel, setNewChannel] = useState("");

	useEffect(() => {
		// Load the channels from firestore(DB)
		// TODO: handle this on the appSlice directly or make a firebase util function
		const unsubscribe = firestore
			.collection("channels")
			.onSnapshot((snapshot) => {
				// console.log(snapshot.docs[0].id);
				// console.log(snapshot.docs[0].data());
				setChannels(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						channel: doc.data(),
					}))
				);
			});

		return () => unsubscribe();
	}, []);

	// DIALOG INPUT CHANGE HANDLER
	const handleChannelOnChange = (event) => {
		// console.log(event.target.value);
		setNewChannel(event.target.value);
	};

	// ADD CHANNEL
	const handleAddChannel = () => {
		if (newChannel) {
			firestore
				.collection("channels")
				.add({
					channelName: newChannel,
				})
				.catch((error) => {
					console.error("ERROR ADDING NEW CHANNEL >>> ", error);
				})
				.finally(setOpenDialog(false));
		}
	};

	const handleLogOut = () => {
		auth.signOut();
	};

	return (
		<>
			<div className="sidebar">
				<div className="sidebar__top">
					<h3>Programmers</h3>
					<ExpandMoreIcon />
				</div>

				{/* SIDEBAR CHANNELS */}
				<div className="sidebar__channels">
					<div className="sidebar__channelsHeader">
						<div className="sidebar__header">
							<ExpandMoreIcon />
							<h4>Text Channels</h4>
						</div>

						{/* ADD BUTTON */}
						<AddIcon
							onClick={() => setOpenDialog(true)}
							className="sidebar__addChannel"
						/>
					</div>

					{/* CHANNEL LIST SECTION */}
					<div className="sidebar__channelList">
						{channels.map(({ id, channel }) => (
							<SidebarChannel
								key={id}
								id={id}
								channelName={channel.channelName}
							/>
						))}
					</div>
				</div>

				{/* VOICE SECTION */}
				<div className="sidebar__voice">
					<SignalCellularAltIcon
						className="sidebar__voiceIcon"
						fontSize="large"
					/>
					<div className="sidebar__voiceInfo">
						<h3>Voice Connected</h3>
						<p>stream</p>
					</div>

					<div className="sidebar__voiceIcons">
						<InfoOutlinedIcon />
						<CallIcon />
					</div>
				</div>

				{/* PROFILE SECTION */}
				<div className="sidebar__profile">
					{/* TODO: get the avatar from the google account */}
					<Avatar src={user.photo} />
					<div className="sidebar__profileInfo">
						<h3>{user.name}</h3>
						<p>{user.email}</p>
					</div>

					<div className="sidebar__profileIcons">
						<MicIcon />
						<HeadsetIcon />
						<SettingsIcon />
						<ExitToAppIcon onClick={handleLogOut} />
					</div>
				</div>
			</div>
			<AddChannelDialog
				open={openDialog}
				handleClose={() => setOpenDialog(false)}
				handleChannelOnChange={handleChannelOnChange}
				handleAddChannel={handleAddChannel}
			/>
		</>
	);
};

export default Sidebar;
