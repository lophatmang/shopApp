import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage/HomePage";
import ShopPage from "./component/ShopPage/ShopPage";
import DetailPage from "./component/DetailPage/DetailPage";
import CartPage from "./component/CartPage/CartPage";
import CheckoutPage from "./component/CheckoutPage/CheckoutPage";
import LoginPage from "./component/LoginPage/LoginPage";
import RegisterPage from "./component/RegisterPage/RegisterPage";
import Layout from "./component/Layout/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

import { actionRegister, loaderHomePage, loaderUser } from "./component/API";
import NotFound from "./component/NotFound/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: loaderHomePage,
      },
      {
        path: "/shop",
        element: <ShopPage />,
        loader: loaderHomePage,
      },
      {
        path: "/detail/:productId",
        element: <DetailPage />,
        loader: loaderHomePage,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: loaderUser,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: actionRegister,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
