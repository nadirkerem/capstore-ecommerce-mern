import { useAppDispatch } from "../app/hooks";
import { clearCart } from "../features/cart/cartSlice";
import { themedToast } from "./ThemedToastContainer";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/");
    dispatch(clearCart());
    themedToast("success", "Order placed successfully!");
  }

  return (
    <div className="container mx-auto max-w-lg p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Shipping Address</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Street Address</span>
              </label>
              <input
                type="text"
                name="street"
                placeholder="123 Main St"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="divider mb-6"></div>

            <h3 className="card-title mb-4">Payment Information</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Card Number</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Expiration Date</span>
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">CVV</span>
              </label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-success w-full">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
