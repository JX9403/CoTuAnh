import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import { callFetchCategory } from "../../../services/api";

const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { setFilter } = props;
  const [listCategory, setListCategory] = useState([]);
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const fetchListCategory = async () => {
    const res = await callFetchCategory();
    if (res && res.data) {
      const d = res.data.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
      setListCategory(d);
    }
  };
  useEffect(() => {
    fetchListCategory();
  }, []);

  var options = [];
  options = listCategory.map((item) => item);
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }

    if (values.category) {
      query += `&category=/${values.category}/i`;
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
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`mainText`}
            label={`Tên sản phẩm`}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>

        <Col span={12}>
        <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Danh mục"
            name="category"
          >
            <Select
             
              options={options}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "center",
          }}>
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
