import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import {
  callCreateProduct,
  callFetchCategory,
} from "../../../services/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const ProductModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.data.map((item) => {
          return { label: item.categoryName, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);

  // "product_name": "string",
  // "price": 0,
  // "unit": "string",
  // "category_id": 1,
  // "description": "string",
  // "quantity": 1
  const onFinish = async (values) => {
    values = {
      product_name: values.product_name,
      price: values.price,
      unit: values.unit,
      category_id: values.category_id,
      description: values.description,
      quantity: values.quantity,
    };

    const { product_name, price, unit, category_id, description, quantity } =
      values;
    console.log("check value gửi đi", values);

    setIsSubmit(true);
    setLoading(true);

    const res = await callCreateProduct(
      product_name,
      price,
      unit,
      category_id,
      description,
      quantity
    );
    if (res && res.data.data) {
      message.success("Tạo mới thành công !");
      form.resetFields();
      setOpenModalCreate(false);
      
      await props.fetchProduct();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra!",
        description: res.data.message,
      });
    }

    setIsSubmit(false);
    setLoading(false)

    return;
  };

  return (
    <>
      <Modal
        title="Thêm mới sản phẩm"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setOpenModalCreate(false);
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        //do not close when click fetchProduct
        maskClosable={false}
        loading = {loading}

      >
        <Divider />

        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên sản phẩm"
                name="product_name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đơn vị"
                name="unit"
                rules={[
                  { required: true, message: "Vui lòng nhập đơn vị sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label=" Danh mục sản phẩm "
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục sản phẩm!",
                  },
                ]}
              >
                <Select
                  initialValues={null}
                  showSearch
                  allowClear
                  //  onChange={handleChange}
                  options={listCategory}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Mô tả"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
   
    </>
  );
};

export default ProductModalCreate;
