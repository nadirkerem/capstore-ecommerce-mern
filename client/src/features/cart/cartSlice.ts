import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/cart-item";
import { toast } from "react-toastify";

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
  shippingFee: 0.03,
  tax: 0.1,
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

      state.total =
        state.subTotal +
        (newCartItem.freeShipping ? 0 : state.shippingFee * state.subTotal) +
        state.tax * state.subTotal;

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

      toast.success("Item added to cart");

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
        toast.success("Item removed from cart");
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
        toast.success("Item updated");
      }
    },
  },
});

export const { addToCart, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
