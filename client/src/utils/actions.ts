/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "react-router-dom";
import { themedToast } from "../components/ThemedToastContainer";
import { instance } from "./axios";
import { Store } from "@reduxjs/toolkit";
import { loginUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";

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

export function checkoutAction(store: Store) {
  return async function ({ request }: { request: Request }) {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());
      const user = store.getState().user;

      if (!user?.user?.userId) {
        throw new Error("User is not authenticated");
      }

      const { cartItems, total, subTotal, tax, shippingFee, numberOfItems } =
        store.getState().cart;

      const orderItems = cartItems.map((item: any) => ({
        cartID: item.cartID,
        name: item.name,
        image: item.image,
        brand: item.brand,
        color: item.color,
        price: item.price,
        amount: item.amount,
        product: item.productId,
      }));

      const shippingAddress = {
        street: body.street as string,
        city: body.city as string,
        state: body.state as string,
        postalCode: body.postalCode as string,
        country: body.country as string,
      };

      const orderData = {
        tax,
        shippingFee,
        subTotal,
        total,
        orderItems,
        user: user.user.userId,
        clientSecret: "mock_secret",
        paymentIntentId: "",
        status: "processing",
        shippingAddress,
        numberOfItems,
      };

      const token = user.token;
      if (!token) throw new Error("User is not authenticated");

      await instance.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      store.dispatch(clearCart());
      themedToast("success", "Order placed successfully");
      return redirect("/");
    } catch (error: any) {
      themedToast(
        "error",
        error?.response?.data?.message || "Failed to place order",
      );
      return null;
    }
  };
}
