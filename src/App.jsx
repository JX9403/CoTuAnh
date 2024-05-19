import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import "./styles/reset.scss";
import ProductTable from "./components/Admin/Product/ProductTable";
import ProductPage from "./pages/product";
import AboutPage from "./pages/about";
import OrderTable from "./components/Admin/Order/OrderTable";
import HistoryOrder from "./components/Account/HistoryOrder";
import ManageInfo from "./components/Account/ManageInfo";
import LayoutAccount from "./components/Account/LayoutAccount";
import ChangePass from "./components/Account/ChangePass";
import ManageInfoAdmin from "./components/Admin/ManageInfoAdmin";
import ClientTable from "./components/Admin/User/Client/ClientTable";
import Cart from "./pages/cart";
import Pay from "./pages/pay";
import OrderDetails from "./components/Account/HistoryOrder/OrderDetails";
import ChangePassAdmin from "./components/Admin/ChangePassAdmin";
import StaffTable from "./components/Admin/User/Staff/StaffTable";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="layout-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount();
    // console.log("check get account ", res);
    if (res && res.data.data) {
      dispatch(doGetAccountAction(res.data.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <AboutPage /> },
        {
          path: "/login",
          element: <LoginPage />,
        },

        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "product/:id",
          element: <ProductPage />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/pay",
          element: (
            <ProtectedRoute>
              <Pay />
            </ProtectedRoute>
          ),
        },

        {
          path: "account",
          element: (
            <ProtectedRoute>
              <LayoutAccount />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "order",
              element: <HistoryOrder />,
             
            },{
              path: "order/:id",
              element: <OrderDetails />,
            },

            {
              index: true,
              element: <ManageInfo />,
            },
            {
              path: "password",
              element: <ChangePass />,
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          children: [
            {
              index : true,
              element: <ClientTable />,
            },
            {
              path: "staff",
              element: <StaffTable/>,
            },
          ],
        },
        {
          path: "product",
          element: <ProductTable />,
        },
        {
          path: "order",
          element: <OrderTable />,
        },
        {
          path: "account",
          children: [
            {
              index: true,
              element: <ManageInfoAdmin />,
            },
            {
              path: "password",
              element: <ChangePassAdmin />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/home" ||
      window.location.pathname === "/contact" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
