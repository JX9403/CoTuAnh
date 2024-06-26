import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DownOutlined,
  GithubOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import "./header.scss";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeCheckchoose, doAllCartById, removeCart } from "../../redux/order/orderSlice";

const Header = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const getCart = useSelector((state) => state.order.carts);
  const [input, setInput] = useState("");

  console.log("check user tu header", user);
  console.log("check cart tu header", getCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateCheckchoose = () => {
    getCart?.forEach((product) => {
      dispatch(changeCheckchoose({ product_id: product.product_id, checkchoose: 1 }));
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    // props.setSearchTerm(e.target.value);
    // navigate("/home")
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.setSearchTerm(input);
      navigate("/home");
    }
  };

  const handleClickIcon = () => {
    props.setSearchTerm(input);
    navigate("/home");
  };

  const handleLogout = async () => {
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(getCart));
    dispatch(doAllCartById([]));
    dispatch(doLogoutAction());
    message.success("Đăng xuất thành công");
    navigate("/");
  };

  let items = [];

 if(user.role === 'ADMIN')  {
    items = [{
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },]
  } else  {
    items = [
      {
        label: <Link to="/account">Quản lý tài khoản</Link>,
        key: "account",
      },
      {
        label: (
          <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Đăng xuất
          </label>
        ),
        key: "logout",
      },
    ]
  }

  return (
    <>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        {/* <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider /> */}
      </Drawer>

      <div className="header-container">
        <header className="header">
          <div className="header__logo" onClick={() => navigate("/")}>
            MinMax
          </div>
          <div className="header__menu">
            <div className="header__menu-item" onClick={() => navigate("/")}>
              Trang chủ
            </div>
            <div
              className="header__menu-item"
              onClick={() => navigate("/home")}
            >
              Sản phẩm
            </div>
            <div
              className="header__menu-item"
              onClick={() => navigate("/contact")}
            >
              Liên hệ
            </div>
          </div>
          <div className="header__search">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type={"text"}
              placeholder="Bạn tìm gì hôm nay"
            />
            <div className="header__search-icon" onClick={handleClickIcon}>
              <SearchOutlined />
            </div>
          </div>

          <div className="header__icon">
            <div className="header__cart">
              <button
                style={{
                  background: "#fff",
                  border: "none",
                  boxShadow: "none",
                }}
                onClick={() => {
                  navigate("/cart"), updateCheckchoose();
                }}
              >
                <Badge count={getCart?.length ?? 0} size={"small"}>
                  <FiShoppingCart className="icon-cart" />
                </Badge>
              </button>
            </div>
            <div className="header__account">
              {!isAuthenticated ? (
                <span onClick={() => navigate("/login")}>
                  <GithubOutlined className="icon-acc" />
                </span>
              ) : (
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <GithubOutlined className="icon-acc" />
                  </a>
                </Dropdown>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
