import { Button, Divider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";

import "./manageInfo.scss";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
const ManageInfo = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.account.user);

  const [form] = useForm();
  form.setFieldsValue(user);
  return (
    <div className="manage-info">
      <section className="wrapper">
        <div className="heading">
          <h2 className="text text-large">Thông tin tài khoản</h2>
          <Divider />
        </div>
        <Form form={form} name="basic" autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Họ tên"
            name="full_name"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Số điện thoại"
            name="phone_number"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <div className="btn">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("edit")}
            >
              Chỉnh sửa
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default ManageInfo;
