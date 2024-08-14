import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

export interface CartState {
  cartItems: Product[];
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      console.log(action.payload);
    },
    clearCart: (state) => {
      console.log(state);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      console.log(action.payload);
    },
    editItem: (state, action: PayloadAction<Product>) => {
      console.log(action.payload);
    },
  },
});

export const { addToCart, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
