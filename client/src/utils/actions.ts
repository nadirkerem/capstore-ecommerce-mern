/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "react-router-dom";
import { themedToast } from "../components/ThemedToastContainer";
import { instance } from "./axios";

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
