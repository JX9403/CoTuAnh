import { Button, Divider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";

import "./manageInfo.scss";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { callUpdateUser } from "../../../services/api";
import { useState } from "react";
const EditInfo = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    alert("onFinish()");
    navigate(-1);
    // const { _id, fullName, phone } = values;
    // setIsSubmit(true);
    // const res = await callUpdateUser(_id, fullName, phone);
    // if (res && res.data) {
    //   message.success("Lưu thành công !");
    //   form.resetFields();
    // } else {
    //   notification.error({
    //     message: "Đã có lỗi xảy ra !",
    //     description: res.message,
    //   });
    // }
    // setIsSubmit(false);
  };

  const user = useSelector((state) => state.account.user);

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
            name="fullName"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <div className="btn" >
            <Button type="primary" size="large" onClick={onFinish} style={{marginRight:'20px', width:'120px'}}>
              Lưu
            </Button>
            <Button  size="large" onClick={() => navigate(-1)} style={{ width:'120px'}}>
              Hủy
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default EditInfo;
