/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "./axios";

export async function landingLoader() {
  const url = "/products?landing=true";
  const response = await instance(url);
  const products = response.data.products;

  return { products };
}

export async function singleProductLoader({ params }: { params: any }) {
  const url = `/products/${params.id}`;
  const response = await instance(url);
  const product = response.data.product;

  return { product };
}

export async function allProductsLoader({ request }: { request: any }) {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries(),
  );
  const url = "/products";
  const response = await instance(url, { params });
  const { products, meta, categories, brands } = response.data;

  return { products, meta, categories, brands, params };
}
