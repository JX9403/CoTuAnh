import { Button, Divider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";

import "./changePass.scss";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { callUpdateUser } from "../../../services/api";
import { useState } from "react";
const ChangePass = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    alert("onFinish()");
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

  // const user = useSelector((state) => state.account.user);

  // form.setFieldsValue(user);
  return (
    <>
      <div className="change-pass">
        <section className="wrapper">
          <div className="heading">
            <h2 className="text text-large">Đổi mật khẩu</h2>
            <Divider />
          </div>
          <Form form={form} name="basic" autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu hiện tại"
              name="password"
              // rules={[
              //   { required: true, message: "Họ tên không được để trống!" },
              // ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu mới"
              name="new-password"
              // rules={[
              //   { required: true, message: "Email không được để trống!" },
              // ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="btn">
              <Button type="primary" size="large" onClick={onFinish}>
                Lưu mật khẩu
              </Button>
            </div>
          </Form>
        </section>
      </div>
    </>
  );
};

export default ChangePass;
