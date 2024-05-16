import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { doAllCartById } from "../../redux/order/orderSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { phone_number, password } = values;
    // console.log(values)
    setIsSubmit(true);
    const res = await callLogin(phone_number, password);
    // console.log(res.data.data.user)
    setIsSubmit(false);
    if (res?.data.data) {
      // lưu dữ token vào localstorage
      localStorage.setItem("access_token", res.data.data.access_token);
      dispatch(doLoginAction(res.data.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      console.log("check du lieu local nhan duoc",localStorage.getItem(`cart_${res.data.data.user.id}`) )
      dispatch(
        doAllCartById(JSON.parse(localStorage.getItem(`cart_${res.data.data.user.id}`)))
      );
      // Chuyển hướng phân quyền
      if (res.data.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.data.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Số điện thoại"
                name="phone_number"
                rules={[
                  { required: true, message: "SĐT không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

