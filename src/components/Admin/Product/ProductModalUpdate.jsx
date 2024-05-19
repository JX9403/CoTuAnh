import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { callFetchCategory, callUpdateProduct } from "../../../services/api";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
} from "antd";

const ProductModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, fetchProduct } =
    props;
  const [listCategory, setListCategory] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);
const [loading, setLoading] = useState(false);


  const [form] = useForm();

  const onFinish = async (values) => {
    values = {
      id: dataUpdate.product_id,
      product_name: values.product_name,
      price: values.price,
      unit: values.unit,
      category_id: values.category_id,
      description: values.description,
      quantity: values.quantity,
    };
    const { id, product_name, price, unit, category_id, description, quantity } =
      values;
    console.log("check value gửi đi", values);
    setIsSubmit(true);
    setLoading(true)
    const res = await callUpdateProduct(id, product_name, price, unit, category_id, description, quantity);
    if (res && res.data.data) {
      message.success("Lưu thành công !");
      form.resetFields();
      setOpenModalUpdate(false);
      await fetchProduct();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra !",
        description: res.message,
      });
    }
    setLoading(false)
    setIsSubmit(false);
  };

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

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
      loading={loading}
        title="Chỉnh sửa thông tin sản phẩm"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setOpenModalUpdate(false);
        }}
        okText={"Lưu"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        //do not close when click fetchProduct
        maskClosable={false}
      >
        <Divider />

        <Form form={form} onFinish={onFinish} autoComplete="off">
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

export default ProductModalUpdate;
