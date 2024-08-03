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

import { loader as landingLoader } from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: "products/:productId",
        element: <SingleProductPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
