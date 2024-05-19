import { DatePicker, Descriptions, Drawer } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const StaffViewDetail = (props) => {
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
        <Descriptions title="Thông tin nhân viên" bordered column={1}>
          <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.full_name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="SĐT">
            {dataViewDetail?.phone_number}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {dataViewDetail?.role}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            <DatePicker
              defaultValue={dayjs(formatDate(dataViewDetail.date_of_birth), dateFormatList[0])}
              format={dateFormatList}
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {dataViewDetail?.address}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default StaffViewDetail;
