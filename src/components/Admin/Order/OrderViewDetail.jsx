import { DatePicker, Descriptions, Drawer, Tag } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { render } from "react-dom";
dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const OrderViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
  };
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

  return (
    <>
      <Drawer
        title="Xem chi tiết"
        onClose={onClose}
        open={openViewDetail}
        width={"50vw"}
      >
        <Descriptions labelStyle={{ width: "35%" }} title="Thông tin đơn hàng " bordered column={1}>
          <Descriptions.Item label="Mã đơn hàng">
            {dataViewDetail?.id}
          </Descriptions.Item>

          <Descriptions.Item label="ID khách hàng">
            {dataViewDetail?.user_id}
          </Descriptions.Item>

          <Descriptions.Item label="Tổng giá trị đơn hàng">
            {dataViewDetail?.total_money}
          </Descriptions.Item>

          <Descriptions.Item label="Phương thức thanh toán">
            {dataViewDetail?.payment_method}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ nhận hàng">
            {dataViewDetail?.shipping_address}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái thanh toán">
            {dataViewDetail?.payment_status === "Đã thanh toán" ? (
              <Tag color="green" key={dataViewDetail?.payment_status}>
                {dataViewDetail?.payment_status?.toUpperCase()}
              </Tag>
            ) : (
              <>
                <Tag color="red" key={dataViewDetail?.payment_status}>
                  {dataViewDetail?.payment_status?.toUpperCase()}
                </Tag>
              </>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái đơn hàng">
            {dataViewDetail?.status == "Đang giao hàng" ? (
              <>
                <Tag color="blue" key={dataViewDetail?.status}>
                  {dataViewDetail?.status?.toUpperCase()}
                </Tag>
              </>
            ) : dataViewDetail?.status === "Đã hoàn thành" ? (
              <>
                <Tag color="green" key={dataViewDetail?.status}>
                  {dataViewDetail?.status?.toUpperCase()}
                </Tag>
              </>
            ) : (
              <>
                <Tag color="red" key={dataViewDetail.status}>
                  {dataViewDetail?.status?.toUpperCase()}
                </Tag>
              </>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày đặt">
            <DatePicker
              defaultValue={dayjs(
                formatDate(dataViewDetail.shipping_date),
                dateFormatList[0]
              )}
              format={dateFormatList}
              disabled
            />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default OrderViewDetail;
