import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  message,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { callCommentProduct } from "../../../services/api";

export default function OrderProduct(props) {
  const [formReview] = useForm();
  const orderItem = props.orderItem;
  const user = props.user;
  const status = props.status;
  console.log("check prop", orderItem);
  const [isComment, setIsComment] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  function maskName(name) {
    name = name.split(" ");
    return name
      .map((word, index) => {
        if (index === name.length - 1) {
          // Giữ nguyên từ đầu và cuối
          return word;
        }
        return word[0] + "*".repeat(word.length - 1); // Thay thế các ký tự bằng dấu *
      })
      .join(" ");
  }

  const checkComments = async () => {
    if (status !== "Đã hoàn thành") {
      setIsComment(true);
    } else {
      if (orderItem.product_response.comments?.length) {
        const foundComment = orderItem.product_response.comments.find(
          (comment) => comment.username === maskName(user.full_name)
        );
        setIsComment(!!foundComment); // Set isComment based on comment existence
      }
    }
  };

  useEffect(() => {
    checkComments();
  }, [orderItem.product_response.comments, user.full_name, status]);

  const onFinish = async (values) => {
    values = {
      ...values,
      user_id: user.id,
      product_id: orderItem.product_response.product_id,
    };
    const res = await callCommentProduct(values);
    console.log("check res call comment", res);

    if (res && res.data.data) {
      message.success("Đánh giá thành công!");
      setShowModal(false);
      setIsComment(true);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.data.message,
      });
    }
  };

  return (
    <>
      <Row key={orderItem.id} className="item-product">
        <Col span={3}>
          <div className="item-img">
            <img src={orderItem.product_response.images[0].image_url} />
          </div>
        </Col>
        <Col span={18}>
          <div className="item-title">
            {orderItem.product_response.product_name}
          </div>
          <div className="item-quantity">x {orderItem.number_of_products}</div>
        </Col>
        <Col span={3} className="item-price">
          {orderItem.product_response.price}đ
        </Col>

        <Col span={3} offset={21}>
          <Button
            className="order-btn"
            type="primary"
            onClick={handleButtonClick}
            size="small"
            disabled={isComment}
          >
            Đánh giá
          </Button>
        </Col>
      </Row>

      <Modal
        title={"Đánh giá của bạn :"}
        onOk={() => {
          formReview.submit();
        }}
        okText="Gửi"
        cancelText="Hủy"
        open={showModal}
        onCancel={() => setShowModal(false)}
      >
        <Divider />
        <Form
          form={formReview}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="star">
            <Rate />
          </Form.Item>

          <Form.Item name="content">
            <Input.TextArea
              rows={6}
              placeholder="Nhập đánh giá của bạn..."
              style={{ padding: "15px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
