import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { Divider, Form, Input, Modal, message, notification, DatePicker } from "antd";
import { callCreateStaff } from "../../../../services/apiAdmin";

const StaffModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate, fetchStaff, page, pageSize } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const [form] = useForm();

  // "email": "string",
  // "password": "string",
  // "phone_number": "6206344080294140278881918447",
  // "address": "string",
  // "date_of_birth": "2024-05-17T10:29:50.151Z",
  // "full_name": "string",
  // "avatar": "string",
  // "role": "ADMIN"
  const onFinish = async (values) => {
    values = {
      full_name: values.full_name,
      email: values.email,
      password: values.password,
      phone_number: values.phone_number,
      role: values.role,
      address: values.address,
      date_of_birth: values.dateofbirth.toString(),
      avatar: "",
    };
    console.log("check value gui di", values);
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

    setIsSubmit(true);

    const res = await callCreateStaff(
      full_name,
      email,
      password,
      phone_number,
      role,
      address,
      date_of_birth,
      avatar
    );
    console.log("check res khi tao moi nguoi dung", res);

    if (res && res.data) {
      message.success("Tạo mới thành công !");
      form.resetFields();

      setOpenModalCreate(false);

      await fetchStaff(page, pageSize);
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
        title="Thêm mới khách hàng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText="Tạo mới"
        cancelText="Hủy"
        confirmLoading={isSubmit}
        width={"50vw"}
      >
        <Divider />
        <Form
          form={form}
         
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Họ tên"
            name="full_name"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            label="Ngày sinh"
            labelCol={{ span: 24 }}
            name="dateofbirth"
          >
            <DatePicker style={{ width: "100%" }} format={dateFormatList} />
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
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vai trò không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: "Địa chỉ không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StaffModalCreate;
