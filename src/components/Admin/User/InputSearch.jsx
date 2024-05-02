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
    if (values.fullName) {
      query += `&fullName=/${values.fullName}/i`;
    }

    if (values.email) {
      query += `&email=/${values.email}/i`;
    }

    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }

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
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`fullName`}
            label={`Name`}
          >
            <Input placeholder="Tim kiem theo ten!" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`email`}
            label={`Email`}
          >
            <Input placeholder="Tim kiem theo email" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`phone`}
            label={`Số điện thoại`}
          >
            <Input placeholder="Tim kiem theo SDT" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              width: "140px",
              height: "40px",
              lineHeight: "1",
              fontSize: "16px",
            }}
            type="primary"
            htmlType="submit"
          >
            Tìm kiếm
          </Button>
          <Button
            style={{
              width: "140px",
              height: "40px",
              lineHeight: "1",
              fontSize: "16px",
              marginLeft: '15px'
            }}
            onClick={() => {
              form.resetFields();
              setFilter("");
            }}
          >
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
