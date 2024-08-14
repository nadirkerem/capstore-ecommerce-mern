import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../../types/cart-item";

import { themedToast } from "../../components/ThemedToastContainer";

import { TAX_RATE, SHIPPING_FEE } from "../../utils/constants";

export interface CartState {
  cartItems: CartItem[];
  numberOfItems: number;
  subTotal: number;
  shippingFee: number;
  tax: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  numberOfItems: 0,
  subTotal: 0,
  shippingFee: 0,
  tax: 0,
  total: 0,
};

function getCachedCart(): CartState {
  const cachedCart = localStorage.getItem("cart");
  return cachedCart ? JSON.parse(cachedCart) : initialState;
}

function saveCartToCache(cart: CartState) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCachedCart(),
  reducers: {
    calculateTotal: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;

      state.tax = state.subTotal * TAX_RATE;
      !newCartItem.freeShipping &&
        (state.shippingFee = state.subTotal * SHIPPING_FEE);
      state.total = state.subTotal + state.tax + state.shippingFee;

      saveCartToCache(state);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.cartID === newCartItem.cartID,
      );
      if (existingCartItem) {
        existingCartItem.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }
      state.numberOfItems += newCartItem.amount;
      state.subTotal += newCartItem.price * newCartItem.amount;

      cartSlice.caseReducers.calculateTotal(state, action);

      themedToast("success", "Item added to cart");

      return state;
    },
    clearCart: () => {
      saveCartToCache(initialState);
      return initialState;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const cartItemToRemove = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.cartID === cartItemToRemove.cartID,
      );
      if (existingCartItem) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.cartID !== cartItemToRemove.cartID,
        );
        state.numberOfItems -= existingCartItem.amount;
        state.subTotal -= existingCartItem.price * existingCartItem.amount;
        cartSlice.caseReducers.calculateTotal(state, action);
        themedToast("error", "Item removed from cart");
      }

      cartSlice.caseReducers.calculateTotal(state, action);
    },
    editItem: (state, action: PayloadAction<CartItem>) => {
      const updatedCartItem = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.cartID === updatedCartItem.cartID,
      );
      if (existingCartItem) {
        state.numberOfItems += updatedCartItem.amount - existingCartItem.amount;
        state.subTotal +=
          updatedCartItem.price *
          (updatedCartItem.amount - existingCartItem.amount);
        existingCartItem.amount = updatedCartItem.amount;
        cartSlice.caseReducers.calculateTotal(state, action);
        themedToast("info", "Item updated");
      }
    },
  },
});

export const { addToCart, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
