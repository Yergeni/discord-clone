import React from "react";

import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import { HelpRounded, SearchRounded, SendRounded } from "@material-ui/icons";

import "./ChatHeader.styles.css";

const ChatHeader = ({ channelName }) => {
	return (
		<div className="chatHeader">
			<div className="chatHeader__left">
				<h3>
					<span className="chatHeader__hash">#</span>
					{channelName ? channelName : "Select a channel"}
				</h3>
			</div>

			<div className="chatHeader__right">
				<NotificationsIcon />
				<EditLocationRoundedIcon />
				<PeopleAltRoundedIcon />

				{/* SEARCH BAR */}
				<div className="chatHeader__search">
					<input type="text" placeholder="Search" />
					<SearchRounded />
				</div>
				<SendRounded />
				<HelpRounded />
			</div>
		</div>
	);
};

export default ChatHeader;
