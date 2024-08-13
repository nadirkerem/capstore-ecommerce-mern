import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { formatPrice } from "../utils/format";
import { Product } from "../types/products";

export default function SingleProductPage() {
  const { product } = useLoaderData() as { product: Product };
  const { name, price, image, description, company, colors, stock } = product;

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(
    stock > 0 ? 1 : 0,
  );

  return (
    <section className="mx-auto max-w-6xl p-10">
      <div className="text-md breadcrumbs mb-12 font-bold">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <span className="cursor-default">{name}</span>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex w-full items-center justify-center">
          <img
            src={image}
            alt={name}
            className="max-h-96 w-auto object-cover"
          />
        </div>

        <div className="w-full">
          <h1 className="mb-4 text-4xl font-bold">{name}</h1>
          <p className="mb-4 text-2xl text-gray-800">{formatPrice(price)}</p>
          <p className="mb-6 text-gray-700">{description}</p>
          <p className="mb-4 text-sm text-gray-500">Brand: {company}</p>

          <div className="mb-6">
            <div>
              <span className="font-semibold">Colors:</span>
              <div className="mt-2 flex gap-4">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`h-8 w-8 cursor-pointer rounded-full border border-gray-300 transition duration-200 ${
                      selectedColor === color &&
                      `ring-2 ring-gray-400 ring-offset-2`
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>

              <div className="form-control mt-2 w-24">
                <label className="label" htmlFor="amount">
                  <span className="font-semibold">Amount:</span>
                </label>
                <select
                  className="select-neutral select select-bordered select-md"
                  id="amount"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                >
                  {[...Array(stock).keys()].map((amount) => (
                    <option key={amount} value={amount + 1}>
                      {amount + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            className="btn btn-neutral w-full md:w-auto"
            onClick={() => console.log("Added")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
