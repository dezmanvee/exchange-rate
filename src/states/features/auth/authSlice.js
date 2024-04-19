import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logoutAuthUser: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginAuthUser, logoutAuthUser } = authSlice.actions;
export default authSlice.reducer;
