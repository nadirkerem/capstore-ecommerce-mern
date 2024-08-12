import { instance } from "./axios";

export async function landingLoader() {
  const url = "/products?landing=true";
  const response = await instance(url);
  const products = response.data.products;

  return { products };
}
