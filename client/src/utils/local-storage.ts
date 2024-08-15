import { themes } from "./themes";

export function initialUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function initialTheme() {
  const theme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}
