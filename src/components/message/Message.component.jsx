import React from "react";

import { Avatar } from "@material-ui/core";
// import ClearIcon from "@material-ui/icons/Clear";

import "./Message.style.css";

const Message = ({ message, userDisplayName, timestamp, avatarPhoto }) => {
	return (
		<div className="message">
			<Avatar src={avatarPhoto} />
			<div className="message__info">
				<h4>
					{userDisplayName}
					<span className="message__timestamp">
						{new Date(timestamp?.toDate()).toUTCString()}
					</span>
				</h4>

				<p>{message}</p>
			</div>
			{/* <div className="message_removeIcon">
				<ClearIcon fontSize="small" />
			</div> */}
		</div>
	);
};

export default Message;
