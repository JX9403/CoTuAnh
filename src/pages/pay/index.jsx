import "./Pay.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Dropdown, Input, message, notification, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { doPlaceOrderAction } from "../../redux/order/orderSlice";
import axios from "axios";
import { callPlaceOrder } from "../../services/api";
import { MdLocationPin } from "react-icons/md";
function Pay() {
  const [cart, setCart] = useState(null);
  const [quantities, setQuantities] = useState({});
  const getCart = useSelector((state) => state.order.carts);
  const [totalPrice, setTotalPrice] = useState(0);
  //   const [user, setUser] = useState(null);
  const getUser = useSelector((state) => state.account.user);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [newAddress, setNewAddress] = useState(getUser.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.account.user);
  // console.log("check user trong thanh toan ",user);
  useEffect(() => {
    if (getCart) {
      const total = getCart.reduce(
        (acc, product) => acc + product.soluong * product.price,
        0
      );
      setTotalPrice(total);
    }
  }, [getCart]);

  const handleAddress = (e) => {
    // console.log(e.target.value);
    setNewAddress(e.target.value);
  };

  const handlePlaceOrder = async () => {
    // 1. Create order data object
    const orderData = getCart.map((item) => {
      return {
        product_id: item.product_id,
        number_of_products: item.soluong,
      };
    });

    const data = {
      user_id: getUser.id,
      payment_method: "Thanh toán khi nhân hàng",
      payment_status: "Đã thanh toán",
      shipping_address: newAddress,
      shipping_date: Date.now(),
      order_details: orderData,
    };
    // console.log("Check data thanh toan gui sang api", data);

    const res = await callPlaceOrder(data);
    // console.log("Check res sau khi call api", res);

    if (res && res.data.data) {
      message.success("Đặt hàng thành công!");
      dispatch(doPlaceOrderAction());
      navigate("/account/order");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.data.message,
      });
    }
  };

  // useEffect(() => {
  //   handlePlaceOrder();
  // }, [newAddress])

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items = [
    {
      label: "Vận chuyển tiết kiệm",
      key: "1",
    },
  ];

  const item1 = [
    {
      label: "Thanh toán khi nhận hàng",
      key: "1",
    },
  ];

  return (
    <>
      <div className="pay">
        <div className="pay-container">
          <div className="pay-d1">
            <div>Thanh toán</div>
          </div>
          <div className="pay-d2">
            <div className="pay-d2-row1">
              <div className="pay-d2-row1-icon">
                {/* <i class="fa-solid fa-location-dot"></i> */}
                {/* <FontAwesomeIcon icon="fa-solid fa-location-dot" /> */}
                <MdLocationPin className="pay-d2-row1-icon-loca" />
              </div>
              <div className="pay-d2-row1-content">
                <div>Thông tin khách hàng</div>
              </div>
            </div>

            {getUser && (
              <div className="pay-d2-row2">
                <div className="pay-d2-row2-column1">
                  <div className="pay-d2-row2-column1-p1">
                    Tên khách hàng : {getUser.full_name}
                  </div>
                  <div className="pay-d2-row2-column1-p2">
                    Số điện thoại : {getUser.phone_number}
                  </div>
                </div>
                <div className="pay-d2-row2-column2">
                  Địa chỉ nhận hàng :
                  <Input
                    defaultValue={newAddress}
                    onChange={(e) => handleAddress(e)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="pay-d3">
            <div className="pay-d3-row1">
              <div className="pay-d3-row1-column1">Sản phẩm</div>
              <div className="pay-d3-row1-column2">Số lượng</div>
              <div className="pay-d3-row1-column3">Đơn giá</div>
              <div className="pay-d3-row1-column4">Thành tiền</div>
            </div>

            <div className="pay-d3-row2">
              {getCart &&
                getCart.map((product, index) => (
                  <div className="pay-d3-row2-wrap" key={product.product_id}>
                    <div className="pay-d3-row2-wrap-column1">
                      <img
                        src={product.images[0].image_url}
                        alt={product.product_name}
                      />
                    </div>
                    <div className="pay-d3-row2-wrap-column2">
                      {product.product_name}
                    </div>
                    <div className="pay-d3-row2-wrap-column3">
                      <div>{product.soluong}</div>
                    </div>
                    <div className="pay-d3-row2-wrap-column4">
                      <div>{product.price}đ</div>
                    </div>
                    <div className="pay-d3-row2-wrap-column5">
                      <div>{product.price * product.soluong}đ</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="pay-d4">
            <div className="pay-d4-row1">
              <div className="pay-d4-row1-column1">
                <div>Đơn vị vận chuyển:</div>
              </div>
              <div className="pay-d4-row1-column2">
                <Dropdown
                  menu={{
                    items: items.map((item) => ({
                      label: item.label,
                      key: item.key,
                    })),
                    onClick,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div className="pay-d4-row1-column2-p1">
                        Vận chuyển nhanh <br></br>
                        <div className="pay-d4-row1-column2-p2">
                          Nhận hàng vào 20/03/2025 - 22/03/2025
                        </div>
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="pay-d4-row1-column3">
                <div>Phí vận chuyển:</div>
              </div>
              <div className="pay-d4-row1-column4">
                <div>0đ</div>
              </div>
            </div>
            <div className="pay-d4-row2">
              <div className="pay-d4-row2-column1">
                <div>Phương thức thanh toán:</div>
              </div>
              <div className="pay-d4-row2-column2">
                <Dropdown
                  style={{ width: "500px" }}
                  menu={{
                    items: item1.map((item) => ({
                      label: item.label,
                      key: item.key,
                    })),
                    onClick,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div>Thanh toán khi nhận hàng</div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="pay-d5">
          <div className="pay-d5-row1">
            <div>Thành tiền</div>
          </div>
          <div className="pay-d5-row2">
            <div className="pay-d5-row2-column1">Tổng tiền hàng:</div>
            <div className="pay-d5-row2-column2">
              <div>{totalPrice}đ</div>
            </div>
          </div>
          <div className="pay-d5-row3">
            <div className="pay-d5-row3-column1">Tổng phí vận chuyển:</div>
            <div className="pay-d5-row3-column2">
              <div>0đ</div>
            </div>
          </div>
          <div className="pay-d5-row4">
            <div className="pay-d5-row4-column1">Tổng thanh toán:</div>
            <div className="pay-d5-row4-column2">
              <div>{totalPrice}đ</div>
            </div>
          </div>
          <div className="pay-d5-row5">
            <button onClick={handlePlaceOrder}>Đặt hàng</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pay;
