import { Button, Col, Divider, Form, Input, Row, message } from "antd";

import { useNavigate } from "react-router-dom";

import "./manageInfoAdmin.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { doUpdateAccountAction } from "../../../redux/account/accountSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ManageInfoAdmin = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.account.user);
  console.log("check dư lieu user  ", user);

  const [isEdit, setIsEdit] = useState(false); // State to manage edit mode
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(user); // Set initial form values from user data
  }, [user]); // Update form values only when user data changes

  const onFinish = async (values) => {
    const updatedUserData = {
      // Map form values to appropriate user data properties
      full_name: values.full_name,
      email: values.email,
      date_of_birth: "2024-05-10T11:54:40.494Z",
      address: "string",
      // ... other user data properties (if applicable)
    };
    // console.log("check data gửi sang redux",updatedUserData);

    const response = await dispatch(doUpdateAccountAction(updatedUserData)); // Call API to update user information

    // console.log(" check user mới ", response.payload);

    if (response && response.payload) {
      message.success("Cập nhật thành công!");
      form.resetFields([user]); // Reset form after successful update
      setIsEdit(false); // Exit edit mode
    } else {
      message.error("Đã có lỗi xảy ra!");
    }
  };
  const toggleEdit = () => {
    setIsEdit(!isEdit); // Toggle edit mode
    form.setFieldsValue(user); // Reset form values to user data when exiting edit mode
  };

  return (
    <Row className="manage-info-admin">
      <Col span={7}>
        <div className="avatar">
          <div className="avatar-circle">
            <FontAwesomeIcon className="avatar-icon" icon={faUser} />
          </div>
          <div className="avatar-name">{user.full_name}</div>
          <div className="avatar-email">{user.email}</div>
        </div>
      </Col>
      <Col span={17}>
        <section className="wrapper">
          <div className="heading">
            <h2 className="text text-large">Thông tin tài khoản</h2>
            <Divider />
          </div>
          <Form form={form} name="basic" autoComplete="off" onFinish={onFinish}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Họ tên"
              name="full_name"
              rules={[
                { required: true, message: "Họ tên không được để trống!" },
              ]}
            >
              <Input disabled={!isEdit} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
              ]}
            >
              <Input disabled={!isEdit} />
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
              // Keep phone number disabled
            >
              <Input disabled />
            </Form.Item>

            {isEdit && ( // Only show save button when in edit mode
              <div className="btn">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ marginRight: "20px", width: "120px" }}
                >
                  Lưu
                </Button>
                <Button
                  size="large"
                  onClick={toggleEdit}
                  style={{ width: "120px" }}
                >
                  Hủy
                </Button>
              </div>
            )}
            {!isEdit && ( // Only show edit button when not in edit mode
              <div className="btn">
                <Button type="primary" size="large" onClick={toggleEdit}>
                  Chỉnh sửa
                </Button>
              </div>
            )}
          </Form>
        </section>
      </Col>
    </Row>
  );
};

export default ManageInfoAdmin;
