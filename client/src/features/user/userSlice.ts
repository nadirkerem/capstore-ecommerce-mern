import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { themes } from "../../utils/themes";
import { themedToast } from "../../components/ThemedToastContainer";
import { initialTheme, initialUser } from "../../utils/local-storage";

export interface UserState {
  user: User | null;
  theme: string;
}

interface User {
  user: {
    username: string;
    email: string;
    role: string;
    userId: string;
  };
  token: string;
}

const initialState: UserState = {
  user: initialUser(),
  theme: initialTheme(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = {
        user: action.payload.user,
        token: action.payload.token,
      };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      return state;
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
