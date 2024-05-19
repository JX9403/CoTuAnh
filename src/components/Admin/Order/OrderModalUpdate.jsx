import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import {
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  message,
  notification,
} from "antd";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { callUpdateOrder } from "../../../services/apiAdmin";
dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const OrderModalUpdate = (props) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    dataUpdate,
    fetchOrder,
    page,
    pageSize,
  } = props;

  const [isSubmit, setIsSubmit] = useState(false);

  const optionPay = [
    { value: "Đã thanh toán", label: "Đã thanh toán" },
    { value: "Chưa thanh toán", label: "Chưa thanh toán" },
  ];

  
  const optionShip = [
    { value: "Đang xử lý", label: "Đang xử lý" },
    { value: "Đang giao hàng", label: "Đang giao hàng" },
    { value: "Đã hoàn thành", label: "Đã hoàn thành" },
  ];

 
  const [form] = useForm();

  const onFinish = async (values) => {
    values.payment_status = values.payment_status
      ? values.payment_status
      : dataUpdate.payment_status;
    values.status = values.status ? values.status : dataUpdate.status;
    values = {
      id: dataUpdate.id,
      payment_status: values.payment_status,
      status: values.status,
    };
    // console.log("check value gui di", values);
    const { id, payment_status, status } = values;
    setIsSubmit(true);
    const res = await callUpdateOrder(id, payment_status, status);
    // console.log("check update data", res);
    if (res && res.data) {
      message.success("Lưu thành công !");
      form.resetFields();
      setOpenModalUpdate(false);
      await fetchOrder(page, pageSize);
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
        title="Cập nhật đơn hàng "
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
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Trạng thái thanh toán"
            name="payment_status"
          >
            <Select
              defaultValue=""
              width="100%"
           
              options={optionPay}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Trạng thái đơn hàng"
            name="status"
          >
             <Select
              defaultValue=""
              width="100%"
           
              options={optionShip}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderModalUpdate;
