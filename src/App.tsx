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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/:productId",
        element: <SingleProductPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
