import { useAppDispatch } from "../app/hooks";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { CartItem as CartItemType } from "../types/cart-item";
import { formatPrice } from "../utils/format";

export default function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const dispatch = useAppDispatch();
  const { name, price, brand, image, color, amount } = cartItem;

  const handleRemoveItem = () => {
    dispatch(removeItem(cartItem));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAmount = parseInt(event.target.value);
    dispatch(editItem({ ...cartItem, amount: newAmount }));
  };

  return (
    <article className="card mb-4 flex flex-col gap-y-4 p-4 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl sm:flex-row sm:items-center">
      <img
        src={image}
        alt={name}
        className="h-32 w-32 rounded-lg object-cover sm:h-40 sm:w-40"
      />

      <div className="flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">{name}</h3>
          <p className="text-sm capitalize text-gray-500">{brand}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm capitalize">Color:</span>
            <span
              className="h-4 w-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            ></span>
          </div>
        </div>
        <div className="mt-4 justify-between sm:mt-0 sm:flex sm:items-center sm:gap-6">
          <div className="mt-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount:
            </label>
            <select
              name="amount"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="select select-bordered select-sm ml-2 w-16 rounded-lg border border-gray-300"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-lg font-semibold sm:ml-auto sm:mt-0">
        {formatPrice(price)}
      </p>
      <button
        onClick={handleRemoveItem}
        className="btn btn-error btn-sm text-sm hover:underline sm:ml-4"
      >
        Remove
      </button>
    </article>
  );
}
