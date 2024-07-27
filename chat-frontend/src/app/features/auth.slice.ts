import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import decodeToken from "../../utils/decodeToken";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image?: string;
}

export interface AuthState {
  user?: IUser;
  token: string;
}

export const initalState: AuthState = {
  user: undefined,
  token: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      const payload: IUser = decodeToken(action.payload.token);
      state.user = payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = undefined;
      state.token = "";
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
})

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;