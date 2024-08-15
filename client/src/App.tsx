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
  checkoutLoader,
} from "./utils/loaders";

import { loginAction, registerAction, checkoutAction } from "./utils/actions";

import { store } from "./app/store";
import ComingSoonPage from "./pages/ComingSoon";

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
        errorElement: <Error />,
        action: registerAction,
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <Error />,
        action: loginAction(store),
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <Error />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        errorElement: <Error />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
      },
      {
        path: "orders",
        element: <ComingSoonPage />,
        errorElement: <Error />,
      },
      {
        path: "dashboard",
        element: <ComingSoonPage />,
        errorElement: <Error />,
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
