import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callRegister } from "../../services/api";
import "./register.scss";

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    values = {
      full_name : values.full_name,
      email : values.email,
      password : values.password,
      phone_number : values.phone_number,
      role: "USER",
      address : values.address,
      date_of_birth : values.dateofbirth.toString(),
      avatar:"",
    };
    console.log( "check value gui di",values);
    const {
      full_name,
      email,
      password,
      phone_number,
      role,
      address,
      date_of_birth,
      avatar,
    } = values;
    // console.log(values);
    setIsSubmit(true);
    // const role = 'USER'
    const res = await callRegister(
      full_name,
      email,
      password,
      phone_number,
      role,
      address,
      date_of_birth,
      avatar
    );
    console.log(res);
    setIsSubmit(false);
    console.log(res);
    if (res?.data?.data?.id) {
      message.success("Đăng ký tài khoản thành công!");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.data.message && Array.isArray(res.data.message)
            ? res.data.message
            : res.data.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
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
                label="Họ tên"
                name="full_name"
                rules={[
                  { required: true, message: "Họ tên không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
              style={{width:'100%'}}
                label="Ngày sinh"
                labelCol={{ span: 24 }}
                name="dateofbirth"
              >
                 <DatePicker style={{width:'100%'}} format={dateFormatList} />
                
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Số điện thoại"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
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
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Địa chỉ không được để trống!" },
                ]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>

              <Divider>Or</Divider>
              <p className="text text-normal">
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
