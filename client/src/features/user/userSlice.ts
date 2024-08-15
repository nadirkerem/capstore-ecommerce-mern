import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { themes } from "../../utils/themes";
import { themedToast } from "../../components/ThemedToastContainer";

export interface UserState {
  user: {
    username: string;
    email: string;
  } | null;
  theme: string;
}

function initialTheme() {
  const theme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

const initialState: UserState = {
  user: {
    username: "nkeremc",
    email: "nadirkeremcetin@gmail.com",
  },
  theme: initialTheme(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      console.log("login");
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      themedToast("success", "Logged out successfully");
    },
    toggleTheme: (state) => {
      const { light, dark } = themes;
      state.theme = state.theme === light ? dark : light;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
