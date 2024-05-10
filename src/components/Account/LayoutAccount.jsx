import React, { useState } from "react";
import "./layout.scss";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Modal, Layout, Menu, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const { Content, Sider } = Layout;

const LayoutAccount = () => {
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
    navigate("/");
};
  const items = [
    {
      label: <label>Hồ sơ</label>,

      icon: <ExceptionOutlined />,
      children: [
        {
          label: <Link to="/account">Thông tin tài khoản</Link>,
          key: "info",
          icon: <ExceptionOutlined />,
        },
        {
          label: <Link to="/account/password">Đổi mật khẩu</Link>,
          key: "password",
          icon: <ExceptionOutlined />,
        },
      ],
    },
    {
      label: <Link to="/account/order">Đơn hàng</Link>,
      key: "order",
      icon: <AppstoreOutlined />,
    },
    {
      label: <div onClick={showModal}>Đăng xuất</div>,
      key: "logout",
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-account">
        <Sider
          width={300}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <span
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "flex",
              justifyContent: "right",
              paddingRight: "30px",
              background: "#46b91d",
              color: "#fff",
              height: "50px ",
              cursor: "pointer",
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: "150%" }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: "150%" }} />
            )}
          </span>
          {collapsed ? (
            ""
          ) : (
            <div className="avatar">
              <div className="avatar-circle">
                <FontAwesomeIcon className="avatar-icon" icon={faUser} />
              </div>
              <div className="avatar-name">{user.fullName}</div>
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
            navigate("/account");
          }}
          okText="Đăng xuất"
          cancelText="Hủy"
        ></Modal>
      </Layout>
    </>
  );
};

export default LayoutAccount;
