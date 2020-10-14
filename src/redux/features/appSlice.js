/**
 * Intended to manage in what channel the user is in
 */
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "app",
	initialState: {
		currentChannel: {
			id: null,
			name: null,
		},
	},
	reducers: {
		setCurrentChannel: (state, action) => {
			state.currentChannel.id = action.payload.id;
			state.currentChannel.name = action.payload.name;
		},
		// setChannelName: (state, action) => {
		//   state.app.channelName = action.payload;
		// },
	},
});

// Export actions
export const { setCurrentChannel } = appSlice.actions;

// Export selectors
export const selectCurrentChannel = (state) => state.app.currentChannel;
// export const selectChannelId = state => state.app.channelId;
// export const selectChannelName = state => state.app.channelName;

// Export reducers
export default appSlice.reducer;
