import { Button, Divider, Form, Input, message, notification } from "antd";

import { useNavigate } from "react-router-dom";

import "./changePass.scss";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { callChangePassword, callUpdateUser } from "../../../services/api";
import { useEffect, useState } from "react";
const ChangePassAdmin = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    setIsSubmit(true);
    // console.log("check value tu form : ", values);
    const { password, new_password } = values;
    // console.log("check value gui len api : ", { password, new_password });
    const res = await callChangePassword(password, new_password);
    // console.log("check res sau khi call api: ", res);
    if(res && res.data) {
      message.success("Đổi mật khẩu thành công!");
      form.setFieldValue("password", "");
      form.setFieldValue("new_password", "");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.data.message,
        duration: 5,
      });
    }
    setIsSubmit(false);
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
          <Form form={form} name="basic" autoComplete="off" onFinish={onFinish}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu hiện tại"
              name="password"
              rules={[
                { required: true, message: "Không được để trống!" },
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu mới"
              name="new_password"
              rules={[
                { required: true, message: "Không được để trống!" },
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            <div className="btn">
              {isSubmit ? <Button type="primary" size="large" htmlType="submit">
                Lưu mật khẩu
              </Button> : <Button type="primary" size="large" htmlType="submit">
                Đổi mật khẩu
              </Button>}
            </div>
          </Form>
        </section>
      </div>
    </>
  );
};

export default ChangePassAdmin;
