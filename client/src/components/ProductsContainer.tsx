/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";

export default function ProductsContainer() {
  const { meta } = useLoaderData() as any;
  const totalProducts = meta.totalProducts;

  return (
    <section className="mx-auto max-w-6xl p-8">
      {totalProducts > 0 ? (
        <ProductsGrid />
      ) : (
        <div className="flex h-96 items-center justify-center">
          <h1 className="text-3xl">Sorry. No products found.</h1>
        </div>
      )}
    </section>
  );
}
