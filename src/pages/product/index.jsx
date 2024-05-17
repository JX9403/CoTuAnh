import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Rate, Divider, Button, Empty } from "antd";
import "./product.scss";
import ImageGallery from "react-image-gallery";
import {
  ArrowLeftOutlined,
  GithubOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./ModalGallery";
import { original } from "@reduxjs/toolkit";
import { render } from "react-dom";
import {
  doAddBookAction,
  doAddToPay,
  removeCart,
} from "../../redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { callProductById } from "../../services/api";
import Skeleton from "react-loading-skeleton";

const ProductPage = () => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); // Sử dụng state để lưu thông tin sản phẩm
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  let param = useParams();

  const id = param.id; // Lấy ID sản phẩm từ URL
  //  console.log(id)
  const refGallery = useRef(null);

  const fetchProduct = async () => {
    try {
      const response = await callProductById(id); // Gọi API để lấy thông tin sản phẩm
      setProduct(response.data.data); // Lưu thông tin sản phẩm vào state
      setIsLoading(false);
      //   console.log("check res", response)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct(); // Gọi hàm fetchProduct khi component được render và ID thay đổi
  }, [id]); // Sử dụng id trong dependency array để useEffect chạy lại khi id thay đổi

  const sliderImages = product?.images.map((item) => {
    const imageURL = item.image_url;
    return {
      original: imageURL,
      thumbnail: imageURL, // Consider using a different URL for thumbnails
      originalClass: "original-image",
      thumbnailClass: "thumbnail-image",
    };
  });
  //   console.log(product);
  // Tạo một mảng mới chứa cả ảnh thumbnail của sản phẩm và các ảnh từ slider
  const images = sliderImages || [];
  // const images = renderSlide()
  // console.log(images)
  const productQuantity = product?.quantity || 1;
  const showQuantityExceededAlert = () => {
    // Hiển thị thông báo
    alert("Số lượng bạn nhập vượt quá số lượng sản phẩm sẵn có");
  };
  const showQuantityExceededAlert1 = () => {
    // Hiển thị thông báo
    alert("Vui lòng nhập số lượng sản phẩm từ lớn hơn hoặc bằng 1");
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      showQuantityExceededAlert1();
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    // setQuantity(quantity + 1)
    if (quantity >= productQuantity) {
      showQuantityExceededAlert();
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.target.value);

    // Kiểm tra nếu giá trị nhập vào không phải là số, hoặc là số âm, hoặc lớn hơn số lượng sản phẩm, đặt quantity về productQuantity
    if (newQuantity > productQuantity) {
      showQuantityExceededAlert();
      newQuantity = productQuantity;
    } else if (isNaN(newQuantity) || newQuantity < 1) {
      showQuantityExceededAlert1();
      newQuantity = 1;
    }

    setQuantity(newQuantity);
  };

  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.order.carts);
  console.log("cart:", cartItem);

  const handleAddToCart = (product, soluong) => {
    dispatch(doAddBookAction({ product, soluong }));
  };
  const handleAddToPay = (product, checkchoose) => {
    dispatch(doAddToPay({ product, checkchoose }));
  };

  const handleRemoveCart = () => {
    dispatch(removeCart());
  };

  return (
    <>
      <div className="Product">
        <div style={{ width: "100%", display: "flex", justifyContent: "left" }}>
          <Button
            onClick={() => navigate(-1)}
            type="primary"
            shape="circle"
            icon={<ArrowLeftOutlined />}
          ></Button>
        </div>
        {isLoading ? (
          <>
            <Row className="Product-detail" gutter={[20, 20]}>
              <Col span={10}>
                <div className="left">
                  <Skeleton
                    style={{ height: "400px", width: "400px" }}
                  ></Skeleton>
                </div>
              </Col>
              <Col span={14}>
                <div className="right">
                  <Skeleton
                    className="title"
                    style={{ height: "60px", width: "100%" }}
                  ></Skeleton>
                  <Skeleton
                    className="rating"
                    style={{ height: "50px", width: "80%" }}
                  ></Skeleton>
                  <Skeleton
                    className="price"
                    style={{ height: "50px", width: "60%" }}
                  ></Skeleton>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="Product-detail" gutter={[20, 20]}>
              <Col span={10}>
                <div className="left">
                  <ImageGallery
                    // ref={refGallery}
                    items={images}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    slideOnThumbnailOver={true} //onHover => auto scroll images
                    onClick={() => handleOnClickImage()}
                  />
                </div>
              </Col>
              <Col span={14}>
                <div className="right">
                  <div className="title">{product?.product_name}</div>
                  <div className="rating">
                    <span className="sold">
                      {/* <Divider type="vertical" /> */}
                      Đã bán : {product?.sold} sản phẩm
                    </span>
                  </div>
                  <div className="price">
                    <span className="currentprice">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product?.price) + `/${product?.unit}`}
                    </span>
                  </div>

                  <div className="quantity">
                    <span className="quantity-1">Số lượng</span>
                    <span className="quantity-2">
                      <button onClick={decreaseQuantity}>
                        <MinusOutlined />
                      </button>

                      <input
                        value={quantity}
                        type="text"
                        onChange={handleQuantityChange}
                      />
                      <button onClick={increaseQuantity}>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button
                      className="cart"
                      onClick={() => {
                        handleAddToCart(product, quantity);
                        handleAddToPay(product, 1);
                      }}
                    >
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>

            <ModalGallery
              isOpen={isOpenModalGallery}
              setIsOpen={setIsOpenModalGallery}
              currentIndex={currentIndex}
              items={images}
              title={product?.product_name}
            />
          </>
        )}

        <Row className="Product-comment" gutter={[20, 20]}>
          <Col span={24} className="comment-title">
            Đánh giá sản phẩm
          </Col>

          {product?.comments.length > 0 ? (
            <>
              {product?.comments.map((cmt, index) => (
                <Col key={index} className="comment-item">
                  <div className="comment-left">
                    <GithubOutlined />
                  </div>
                  <div className="comment-right">
                    <div className="comment-name">{cmt.username}</div>
                    <div className="comment-rate">
                      <Rate value={cmt.star} />
                    </div>
                    <div className="comment-text">{cmt.content}</div>
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <>
              <div
                className="comment-item"
                style={{ justifyContent: "center" }}
              >
                <Empty description="Chưa có bình luận nào cho sản phẩm này !"></Empty>
              </div>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
