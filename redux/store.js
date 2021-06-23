import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import listSlice from "./list";

export default configureStore({
    reducer: {
        auth: authSlice,
        list: listSlice,
    },
});
