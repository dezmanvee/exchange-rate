import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./states/features/auth/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: false,
})

