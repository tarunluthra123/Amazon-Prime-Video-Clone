import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "Tarun Luthra",
        username: "tarun",
        isLoggedIn: true,
    },
    reducers: {
        login: (state, { payload }) => {
            state.name = payload.name;
            state.username = payload.username;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.name = undefined;
            state.username = undefined;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
