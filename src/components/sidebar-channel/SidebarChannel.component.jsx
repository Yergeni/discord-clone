import React from "react";

import { useDispatch } from "react-redux";
import { setCurrentChannel } from "../../redux/features/appSlice";

import "./SidebarChannel.styles.css";

const SidebarChannel = ({ id, channelName }) => {
	const dispatch = useDispatch();

	// SET THE CURRENT CHANNEL SELECTED BY THE USER
	const handleSelectChannel = () => {
		dispatch(
			setCurrentChannel({
				id: id,
				name: channelName,
			})
		);
	};

	return (
		<div className="sidebarChannel" onClick={handleSelectChannel}>
			<h4>
				<span className="sidebarChannel__hash">#</span>
				{channelName}
			</h4>
		</div>
	);
};

export default SidebarChannel;
