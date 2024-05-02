import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";
import { Divider, Form, Input, Modal, message, notification } from "antd";

const UserModalUpdate = (props) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    dataUpdate,
    fetchUser,
    
  } = props;

  
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = useForm();

  const onFinish = async (values) => {
    const { _id, fullName, phone } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Lưu thành công !");
      form.resetFields();
      setOpenModalUpdate(false);
      await fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra !",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

 
  useEffect(()=> {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate])

  return (
    <>
      <Modal forceRender 
        title="Chỉnh sửa thông tin "
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalUpdate(false)}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            hidden
            labelCol={{ span: 24 }} //whole column
            label="ID"
            name="_id"
          >
            <Input />
          </Form.Item>
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
            <Input disabled />
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

export default UserModalUpdate;
