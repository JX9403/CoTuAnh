import { Descriptions, Drawer } from "antd";
import { useEffect } from "react";
const UserViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
  };
  

  return (
    <>
      <Drawer
        title="Xem chi tiết"
        onClose={onClose}
        open={openViewDetail}
        width={"50vw"}
      >
        <Descriptions title="Thông tin user " bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="SĐT">
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {dataViewDetail?.role}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserViewDetail;
