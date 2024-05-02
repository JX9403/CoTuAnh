import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { callCreateUser } from "../../../services/api";
import { Divider, Form, Input, Modal, message, notification } from "antd";

const UserModalCreate = (props) => {
  const {openModalCreate, setOpenModalCreate, fetchUser} = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success("Tạo mới thành công !");
      form.resetFields();
      setOpenModalCreate(false);
      await fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra !",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {form.submit()}}
        onCancel={()=> setOpenModalCreate(false)}
        okText="Tạo mới"
        cancelText="Hủy"
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalCreate;
