import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContactPage from './pages/contact';
import LoginPage from './pages/login';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import './styles/reset.scss';
import UserTable from './components/Admin/User/UserTable';
import ProductTable from './components/Admin/Product/ProductTable';
import ProductPage from './pages/product';
import AboutPage from './pages/about';
import OrderTable from './components/Admin/Order/OrderTable';


const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='layout-app'>
      <Header searchTerm = {searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;

    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <AboutPage /> },
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
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "product",
          element: <ProductTable />,
        },
        {
          path: "order",
          element: <OrderTable />,
        },
      ],
    },


    
  ]);

  return (
    <>
      {
        isLoading === false
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}
