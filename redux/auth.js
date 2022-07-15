import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = {
                ...action.payload,
                isLoggedIn: true,
            };
        },
        logout(state) {
            state.user = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
