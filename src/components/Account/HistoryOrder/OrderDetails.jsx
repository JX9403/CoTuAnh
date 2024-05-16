import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  DownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, message, notification, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { callFetchOrderDetails } from "../../../services/api";
import "./OrderDetails.scss";
function OrderDetails() {
  const getUser = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [order, setOrder] = useState({});
  // console.log(param)
  const idOrder = param.id;

  const fetchOrderDetails = async (id) => {
    const res = await callFetchOrderDetails(id);
    if (res && res.data.data) {
      setOrder(res.data.data);
    }
  };
  useEffect(() => {
    fetchOrderDetails(idOrder);
  }, [idOrder]);

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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formattedDate;
  }

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <>
      <div className="orderDetail">
        <div className="orderDetail-container">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Button
              onClick={() => navigate(-1)}
              type="primary"
              shape="circle"
              icon={<ArrowLeftOutlined />}
            ></Button>
          </div>
          <div className="orderDetail-d1">
            <div>Thông tin đơn hàng : #{order.id}</div>
          </div>
          <div className="orderDetail-d2">
            <div className="orderDetail-d2-row1">
              <div className="orderDetail-d2-row1-icon">
                <MdLocationPin className="orderDetail-d2-row1-icon-loca" />
              </div>
              <div className="orderDetail-d2-row1-content">
                <div>Thông tin khách hàng </div>
              </div>
            </div>

            {getUser && (
              <div className="orderDetail-d2-row2">
                <div>
                  <div className="orderDetail-d2-row2-column2">
                    Tên khách hàng : {getUser.full_name}
                  </div>
                  <div className="orderDetail-d2-row2-column2">
                    Số điện thoại : {getUser.phone_number}
                  </div>
                </div>
                <div className="orderDetail-d2-row2-column2">
                  Địa chỉ nhận hàng : {order.shipping_address}
                </div>
                <div className="orderDetail-d2-row2-column2">
                  Ngày đặt : {formatDate(order.created_at)}
                </div>
              </div>
            )}
          </div>
          <div className="orderDetail-d3">
            <div className="orderDetail-d3-row1">
              <div className="orderDetail-d3-row1-column1">Sản phẩm</div>
              <div className="orderDetail-d3-row1-column2">Số lượng</div>
              <div className="orderDetail-d3-row1-column3">Đơn giá</div>
              <div className="orderDetail-d3-row1-column4">Thành tiền</div>
            </div>

            <div className="orderDetail-d3-row2">
              {order.order_details &&
                order.order_details.map((product, index) => (
                  <div
                    onClick={() =>
                      handleProduct(product.product_response.product_id)
                    }
                    className="orderDetail-d3-row2-wrap"
                    key={product.product_response.product_id}
                  >
                    <div className="orderDetail-d3-row2-wrap-column1">
                      <img
                        src={product.product_response.images[0].image_url}
                        alt={product.product_response.product_name}
                      />
                    </div>
                    <div className="orderDetail-d3-row2-wrap-column2">
                      {product.product_response.product_name}
                    </div>
                    <div className="orderDetail-d3-row2-wrap-column3">
                      <div>x{product.number_of_products}</div>
                    </div>
                    <div className="orderDetail-d3-row2-wrap-column4">
                      <div>{product.product_response.price}đ</div>
                    </div>
                    <div className="orderDetail-d3-row2-wrap-column5">
                      <div>
                        {product.product_response.price *
                          product.number_of_products}
                        đ
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="orderDetail-d4">
            <div className="orderDetail-d4-row1">
              <div className="orderDetail-d4-row1-column1">
                <div>Đơn vị vận chuyển:</div>
              </div>
              <div className="orderDetail-d4-row1-column2">
                <Dropdown
                  disabled
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
                      <div className="orderDetail-d4-row1-column2-p1">
                        Vận chuyển nhanh <br></br>
                        <div className="orderDetail-d4-row1-column2-p2">
                          Nhận hàng vào 20/03/2025 - 22/03/2025
                        </div>
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="orderDetail-d4-row1-column3">
                <div>Phí vận chuyển:</div>
              </div>
              <div className="orderDetail-d4-row1-column4">
                <div>0đ</div>
              </div>
            </div>
            <div className="orderDetail-d4-row2">
              <div className="orderDetail-d4-row2-column1">
                <div>Phương thức thanh toán:</div>
              </div>
              <div className="orderDetail-d4-row2-column2">
                <Dropdown
                  disabled
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
        <div className="orderDetail-d5">
          <div className="orderDetail-d5-row1">
            <div>Thành tiền</div>
          </div>
          <div className="orderDetail-d5-row2">
            <div className="orderDetail-d5-row2-column1">Tổng tiền hàng: </div>
            <div className="orderDetail-d5-row2-column2">
              <div>{order.total_money}đ</div>
            </div>
          </div>
          <div className="orderDetail-d5-row3">
            <div className="orderDetail-d5-row3-column1">
              Tổng phí vận chuyển:
            </div>
            <div className="orderDetail-d5-row3-column2">
              <div>0đ</div>
            </div>
          </div>
          <div className="orderDetail-d5-row4">
            <div className="orderDetail-d5-row4-column1">Tổng thanh toán: </div>
            <div className="orderDetail-d5-row4-column2">
              <div>{order.total_money}đ</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderDetails;
