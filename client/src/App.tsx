import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomeLayout,
  LandingPage,
  LoginPage,
  OrdersPage,
  ProductsPage,
  RegisterPage,
  SingleProductPage,
} from "./pages";

import { Error } from "./components";

import {
  landingLoader,
  allProductsLoader,
  singleProductLoader,
} from "./utils/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    loader: allProductsLoader,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <Error />,
        loader: landingLoader,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
        errorElement: <Error />,
        loader: allProductsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProductPage />,
        errorElement: <Error />,
        loader: singleProductLoader,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
