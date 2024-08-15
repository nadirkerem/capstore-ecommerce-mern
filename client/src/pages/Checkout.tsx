import { useAppSelector } from "../app/hooks";
import { CartInfo, CheckoutForm, SectionTitle } from "../components";

export default function CheckoutPage() {
  const total = useAppSelector((state) => state.cart.total);

  return (
    <section className="mx-auto max-w-7xl p-12 lg:p-16">
      {total > 0 ? (
        <>
          <SectionTitle text="Checkout" />
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
            <CheckoutForm />
            <CartInfo checkout />
          </div>
        </>
      ) : (
        <>
          <SectionTitle text="Your cart is empty" />
        </>
      )}
    </section>
  );
}
