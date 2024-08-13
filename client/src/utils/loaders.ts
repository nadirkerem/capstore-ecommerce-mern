/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "./axios";

export async function landingLoader() {
  const url = "/products?landing=true";
  const response = await instance(url);
  const products = response.data.products;

  return { products };
}

export async function productLoader({ params }: { params: any }) {
  const url = `/products/${params.id}`;
  const response = await instance(url);
  const product = response.data.product;

  return { product };
}
