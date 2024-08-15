/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "react-router-dom";
import { themedToast } from "../components/ThemedToastContainer";
import { instance } from "./axios";
import { Store } from "@reduxjs/toolkit";
import { loginUser } from "../features/user/userSlice";

export async function registerAction({ request }: { request: any }) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  try {
    await instance.post("/auth/register", body);
    themedToast("success", "Account created successfully");
    return redirect("/login");
  } catch (error: any) {
    themedToast(
      "error",
      error?.response?.data?.message || "Failed to create account",
    );
  }
  return null;
}

export function loginAction(store: Store) {
  return async function ({ request }: { request: any }) {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    try {
      const { data } = await instance.post("/auth/login", body);
      store.dispatch(loginUser(data));
      themedToast("success", "Logged in successfully");
      return redirect("/");
    } catch (error: any) {
      themedToast("error", error?.response?.data?.message || "Failed to login");
    }
    return null;
  };
}
