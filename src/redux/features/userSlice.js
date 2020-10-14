/**
 * All the information needed for user states
 */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export selectors
export const selectUser = (state) => state.user.user;

// Export reducers
export default userSlice.reducer;
