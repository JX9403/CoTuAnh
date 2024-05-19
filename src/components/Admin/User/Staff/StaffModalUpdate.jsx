import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import {
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  message,
  notification,
} from "antd";
import { callUpdateStaff } from "../../../../services/apiAdmin";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const StaffModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, fetchStaff , page, pageSize} =
    props;

  const [isSubmit, setIsSubmit] = useState(false);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Tháng tính từ 0
    const year = date.getUTCFullYear();

    // Đảm bảo định dạng dd/mm/yyyy
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  const [form] = useForm();
  // full_name: values.full_name,
  // email: values.email,
  // password: values.password,
  // phone_number: values.phone_number,
  // role: values.role,
  // address: values.address,
  // date_of_birth: values.dateofbirth.toString(),
  // avatar: "",
  const onFinish = async (values) => {
    values.newPassword = values.newPassword
      ? values.newPassword
      : dataUpdate.password;
    values.dateofbirth = values.dateofbirth == null
      ? dataUpdate.date_of_birth
      : values.dateofbirth;
    values = {
      id: dataUpdate.id,
      full_name: values.full_name,
      email: values.email,
      password: values.newPassword,
      phone_number: values.phone_number,
      role: values.role,
      address: values.address,
      date_of_birth: values.dateofbirth,
      avatar: "",
    };
    console.log("check value gui di", values);
    const {
      id,
      full_name,
      email,
      password,
      phone_number,
      role,
      address,
      date_of_birth,
      avatar,
    } = values;
    // setIsSubmit(true);
    const res = await callUpdateStaff(
      id,
      full_name,
      email,
      password,
      phone_number,
      role,
      address,
      date_of_birth,
      avatar
    );
    // console.log("check update data", res);
    if (res && res.data) {
      message.success("Lưu thành công !");
      form.resetFields();
      setOpenModalUpdate(false);
      await fetchStaff(page, pageSize);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra !",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  // console.log("check dataupdate", dataUpdate);
  return (
    <>
      <Modal
        forceRender
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
        <Form form={form} name="basic" onFinish={onFinish}>
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
            label="Tạo mật khẩu mới"
            name="newPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Vai trò"
            name="role"
            rules={[
              { required: true, message: "Vai trò không được để trống!" },
            ]}
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

export default StaffModalUpdate;
