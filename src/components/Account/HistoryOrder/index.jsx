import {
  Button,
  Col,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  Skeleton,
} from "antd";
import "./historyOrder.scss";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { callListOrder } from "../../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";
const HistoryOrder = () => {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  // const [value, setValue] = useState(0);
  // const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const user = useSelector((state) => state.account.user);

  const fetchListOrder = async () => {
    setSubmit(true);
    const res = await callListOrder();
    // console.log("check res call order :", res);
    if (res && res.data.data) {
      setOrderList(res.data.data);
    }

    setSubmit(false);
  };
  const handleDetailOrder = (id) => {
    navigate(`${id}`);
  };
  // console.log("check  order :", orderList)
  useEffect(() => {
    fetchListOrder();
  }, []);
  // console.log("check rate", value);
  return (
    <>
      <div className="order">
        {submit ? (
          <>
            <div className="order-box">
              <Row>
                <Skeleton className="item-id"></Skeleton>
              </Row>
            </div>
            <div className="order-box">
              <Row>
                <Skeleton className="item-id"></Skeleton>
              </Row>
            </div>
            <div className="order-box">
              <Row>
                <Skeleton className="item-id"></Skeleton>
              </Row>
            </div>
          </>
        ) : (
          <>
            {orderList.length > 0 ? (
              <>
                {orderList.map((order) => (
                  <div
                    onClick={() => handleDetailOrder(order.id)}
                    className="order-box"
                    key={order.id}
                  >
                    <Row>
                      <Col className="item-id" span={21}>
                        Mã đơn hàng : {order.id}
                      </Col>

                      <Col span={3} className="item-status">
                        {order.status.toUpperCase()}
                      </Col>
                    </Row>

                    <Divider />

                    {order.order_details.map((orderItem) => (
                      <OrderProduct orderItem={orderItem} user={user} />
                    ))}
                    <Divider />
                    <Row>
                      <Col className="order-price" span={6} offset={18}>
                        Thành tiền : <span>{order.total_money}đ</span>
                      </Col>
                    </Row>
                  </div>
                ))}
              </>
            ) : (
              <>
                <Empty description="Bạn chưa có đơn hàng nào!">
                  <Button type="primary" onClick={() => navigate("/home")}>
                    Mua ngay
                  </Button>
                </Empty>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HistoryOrder;
