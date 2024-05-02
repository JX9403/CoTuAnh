import React, { useState } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Quản lý tài khoản</span>,
    // key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">Quản lý tài khoản</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/product">Quản lý sản phẩm</Link>,
    key: "product",
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to="/admin/order">Quản lý hóa đơn</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "/",
    },
    {
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "account",
    },
    {
      label: <Link to="/admin">Quản lý tài khoản</Link>,
      key: "account",
    },
    {
      label: <label onClick={() => handleLogout()}>Đăng xuất</label>,
      key: "logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        width={250}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {collapsed ? (
          <div
            className="logo"
            style={{ height: 32, margin: 16, textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            M
          </div>
        ) : (
          <div
            className="logo"
            style={{ height: 32, margin: 16, textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            MinMax
          </div>
        )}

        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>
          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <GithubOutlined className="icon-acc" />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
