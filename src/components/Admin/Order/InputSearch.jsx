import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";

// https://stackblitz.com/run?file=demo.tsx
// https://ant.design/components/form
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { setFilter } = props;
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    let query = "";
    query = values.id;

    if (query) {
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row
        gutter={24}
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col span={24}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`id`}
            label={`Mã đơn hàng`}
          >
            <Input placeholder="Tìm kiếm theo mã đơn hàng..." />
          </Form.Item>
        </Col>

        <Col>
          <Button
            style={{
              width: "120px",

              lineHeight: "1",
              fontSize: "16px",
            }}
            type="primary"
            htmlType="submit"
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
