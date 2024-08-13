import { Link } from "react-router-dom";

import { formatPrice } from "../utils/format";

import { Product } from "../types/products";

export default function ProductCard({ id, name, price, image }: Product) {
  return (
    <Link
      key={name}
      to={`/products/${id}`}
      className="card w-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt={name}
          className="h-96 w-auto rounded-xl object-cover md:h-48"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize">{name}</h2>
        <span className="mt-auto text-neutral">{formatPrice(price)}</span>
      </div>
    </Link>
  );
}
