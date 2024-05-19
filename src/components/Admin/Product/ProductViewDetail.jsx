import { Descriptions, Divider, Drawer, Image, Empty } from "antd";

const ProductViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  let imageLinks;
  if (dataViewDetail) {
    imageLinks = dataViewDetail?.images.map((img) => {
      return img.image_url;
    });
  }

  return (
    <>
      <Drawer
        title="Xem chi tiết"
        onClose={onClose}
        open={openViewDetail}
        width={"50vw"}
      >
        <Descriptions title="Thông tin sản phẩm " bordered column={1}>
          <Descriptions.Item label="Id">
            {dataViewDetail?.product_id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm">
            {dataViewDetail?.product_name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {dataViewDetail?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Đơn vị">
            {dataViewDetail?.unit}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            {dataViewDetail?.category_id}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng">
            {dataViewDetail?.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Đã bán">
            {dataViewDetail?.sold}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {dataViewDetail?.description}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left"> Ảnh </Divider>

        {dataViewDetail ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {imageLinks.map((src, index) => (
                <div key={index} style={{ margin: "8px" }}>
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={src}
                   
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Empty description="Chưa có ảnh !" />
          </>
        )}
      </Drawer>
    </>
  );
};

export default ProductViewDetail;
