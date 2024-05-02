import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

  // const getBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  // NOTE sua duong URL image
  useEffect(() => {
    if (dataViewDetail) {
      let imgThumbnail = {};
      if (dataViewDetail.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataViewDetail.thumbnail
          }`,
        };
      }
      setFileList([imgThumbnail]);
    }
  }, [dataViewDetail]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm">
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            {dataViewDetail?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng">
            {dataViewDetail?.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {dataViewDetail?.author}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left"> Ảnh </Divider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
};

export default ProductViewDetail;
