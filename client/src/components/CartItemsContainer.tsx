import { useAppSelector } from "../app/hooks";

import { CartItem } from ".";

export default function CartItemsContainer() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.cartID} cartItem={cartItem}></CartItem>
      ))}
    </>
  );
}
