import { useLoaderData } from "react-router-dom";

import { ProductCard } from "./";

import { Product } from "../types/products";

export default function ProductsGrid() {
  const { products } = useLoaderData() as { products: Product[] };

  return (
    <div className="grid gap-12 p-6 md:grid-cols-1 md:gap-4 md:p-12 lg:grid-cols-2 xl:grid-cols-3">
      {products ? (
        products.map((product: Product) => {
          return <ProductCard key={product.id} {...product} />;
        })
      ) : (
        <div className="text-center">Sorry. No products found.</div>
      )}
    </div>
  );
}
