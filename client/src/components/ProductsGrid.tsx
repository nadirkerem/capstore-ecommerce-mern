import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../types/products";

export default function ProductsGrid() {
  const { products } = useLoaderData() as { products: Product[] };

  console.log(products);
  return (
    <div className="grid gap-4 pt-12 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product: Product) => {
        const { id, name, price, image } = product;
        return (
          <Link
            key={name}
            to={`/products/${id}`}
            className="card w-full shadow-xl transition duration-300 hover:shadow-2xl"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={name}
                className="h-64 w-full rounded-xl object-cover md:h-48"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{name}</h2>
              <span className="text-primary">{price}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
