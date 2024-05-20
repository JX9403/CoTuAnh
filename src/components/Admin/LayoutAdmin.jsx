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
import { Layout, Menu, Dropdown, Space, message, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";

import { doLogoutAction } from "../../redux/account/accountSlice";

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    dispatch(doLogoutAction());
    message.success("Đăng xuất thành công");
    navigate("/admin");
  };
  let items = [];
  if (user.role === "SALES") {
    items = [
      {
        label: (
          <Link style={{ textDecoration: "none" }} to="/admin/order">
            Quản lý hóa đơn
          </Link>
        ),
        key: "order",
        icon: <DollarCircleOutlined />,
      },

      {
        label: <span>Tài khoản của tôi</span>,

        icon: <DollarCircleOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/account">
                Thông tin tài khoản
              </Link>
            ),
            key: "account",
            icon: <TeamOutlined />,
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/account/password"
              >
                Đổi mật khẩu
              </Link>
            ),
            key: "password",
            icon: <TeamOutlined />,
          },
        ],
      },

      {
        label: <div onClick={showModal}>Đăng xuất</div>,
        key: "logout",
        icon: <DollarCircleOutlined />,
      },
    ];
  } else if (user.role === "WAREHOUSES") {
    items = [
      {
        label: <span>Quản lý sản phẩm</span>,
        // key: 'user',
        icon: <ExceptionOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/product">
                Sản phẩm
              </Link>
            ),
            key: "product",
            icon: <TeamOutlined />,
          },
          {
            label: <span>Kho</span>,
            key: "warehouse",
            children: [
              {
                label: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/admin/product/receipt"
                  >
                    Nhập kho
                  </Link>
                ),
                key: "receipt",
                // icon: <TeamOutlined />,
              },
              {
                label: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/admin/product/receipt/inventory"
                  >
                    Kiểm kho
                  </Link>
                ),
                key: "inventory",
                // icon: <TeamOutlined />,
              },
            ],
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/product/partner"
              >
                Nhà cung cấp
              </Link>
            ),
            key: "partner",
          },
        ],
      },

      {
        label: <span>Tài khoản của tôi</span>,

        icon: <DollarCircleOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/account">
                Thông tin tài khoản
              </Link>
            ),
            key: "account",
            icon: <TeamOutlined />,
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/account/password"
              >
                Đổi mật khẩu
              </Link>
            ),
            key: "password",
            icon: <TeamOutlined />,
          },
        ],
      },

      {
        label: <div onClick={showModal}>Đăng xuất</div>,
        key: "logout",
        icon: <DollarCircleOutlined />,
      },
    ];
  } else {
    items = [
      {
        label: (
          <Link style={{ textDecoration: "none" }} to="/admin">
            Dashboard
          </Link>
        ),
        key: "dashboard",
        icon: <AppstoreOutlined />,
      },
      {
        label: <span>Quản lý tài khoản</span>,
        // key: 'user',
        icon: <UserOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/user">
                Khách hàng
              </Link>
            ),
            key: "client",
            icon: <TeamOutlined />,
          },
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/user/staff">
                Nhân viên
              </Link>
            ),
            key: "staff",
            icon: <TeamOutlined />,
          },
        ],
      },
      {
        label: <span>Quản lý sản phẩm</span>,
        // key: 'user',
        icon: <ExceptionOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/product">
                Sản phẩm
              </Link>
            ),
            key: "product",
            icon: <TeamOutlined />,
          },
          {
            label: <span>Kho</span>,
            key: "warehouse",
            children: [
              {
                label: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/admin/product/receipt"
                  >
                    Nhập kho
                  </Link>
                ),
                key: "receipt",
                // icon: <TeamOutlined />,
              },
              {
                label: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/admin/product/receipt/inventory"
                  >
                    Kiểm kho
                  </Link>
                ),
                key: "inventory",
                // icon: <TeamOutlined />,
              },
            ],
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/product/partner"
              >
                Nhà cung cấp
              </Link>
            ),
            key: "partner",
          },
        ],
      },

      {
        label: (
          <Link style={{ textDecoration: "none" }} to="/admin/order">
            Quản lý hóa đơn
          </Link>
        ),
        key: "order",
        icon: <DollarCircleOutlined />,
      },
      {
        label: <span>Thống kê</span>,
        // key: 'user',
        icon: <AppstoreOutlined />,
        children: [
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/revenuestatistic"
              >
                Báo cáo bán hàng
              </Link>
            ),
            key: "1",
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/revenuestatistic/receiptstatistic"
              >
                Báo cáo nhập hàng
              </Link>
            ),
            key: "2",
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/revenuestatistic/profitstatistic"
              >
                Báo cáo lợi nhuận
              </Link>
            ),
            key: "3",
          },
        ],
      },
      {
        label: <span>Tài khoản của tôi</span>,

        icon: <DollarCircleOutlined />,
        children: [
          {
            label: (
              <Link style={{ textDecoration: "none" }} to="/admin/account">
                Thông tin tài khoản
              </Link>
            ),
            key: "account",
            icon: <TeamOutlined />,
          },
          {
            label: (
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/account/password"
              >
                Đổi mật khẩu
              </Link>
            ),
            key: "password",
            icon: <TeamOutlined />,
          },
        ],
      },

      {
        label: <div onClick={showModal}>Đăng xuất</div>,
        key: "logout",
        icon: <DollarCircleOutlined />,
      },
    ];
  }

  const itemsDropdown = [
    {
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
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
                <span>I am {user.full_name}</span>
                <GithubOutlined className="icon-acc" />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <Modal
        width={"500px"}
        title="Bạn muốn đăng xuất khỏi tài khoản ?"
        open={open}
        onOk={handleLogout}
        onCancel={() => {
          hideModal();
          navigate("/admin");
        }}
        okText="Đăng xuất"
        cancelText="Hủy"
      ></Modal>
    </Layout>
  );
};

export default LayoutAdmin;
