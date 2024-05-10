import { Button, Divider, Form, Input, message, notification } from "antd";

import { useNavigate } from "react-router-dom";

import "./manageInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { callUpdateInfo } from "../../../services/api";
import { useEffect, useState } from "react";
import { doUpdateAccountAction } from "../../../redux/account/accountSlice";
const EditInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    values = {
      ...values,
      date_of_birth: "2024-05-10T11:54:40.494Z",
      address: "string",
    };
    const { full_name, email, date_of_birth, address } = values;

    setIsSubmit(true);

    const res = await callUpdateInfo(full_name, email, date_of_birth, address);

    dispatch(
      doUpdateAccountAction({ full_name, email, date_of_birth, address })
    );
    localStorage.removeItem("access_token")
    console.log(res);
    // if (res && res.data) {
    //   message.success("Lưu thành công !");
    //   form.resetFields();
    // } else {
    //   notification.error({
    //     message: "Đã có lỗi xảy ra !",
    //     description: "Đã có lỗi xảy ra !",
    //   });
    // }
    // setIsSubmit(false);
    navigate(-1);
  };

  // useEffect(() => {

  // }, [])

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
            name="full_name"
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
              onClick={onFinish}
              style={{ marginRight: "20px", width: "120px" }}
            >
              Lưu
            </Button>
            <Button
              size="large"
              onClick={() => navigate(-1)}
              style={{ width: "120px" }}
            >
              Hủy
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default EditInfo;
