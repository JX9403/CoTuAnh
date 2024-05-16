import "./cart.scss";
import { Button, Checkbox, message, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  removeCart,
  removeProduct,
} from "../../redux/order/orderSlice";
import { useNavigate } from "react-router";
import { Empty } from "antd";

function Cart() {
  //API
  const [cart, setCart] = useState(null);
  const [quantities, setQuantities] = useState({}); // Lưu trữ số lượng của từng sản phẩm
  const [selectedProducts, setSelectedProducts] = useState({}); // Lưu trữ trạng thái của các sản phẩm được chọn
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Trạng thái của checkbox chọn tất cả
  const navigate = useNavigate();
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCart = useSelector((state) => state.order.carts);
  //hàm tính tổng thanh toán
  // const totalPrice = getCart.reduce((total, item) => {
  //   return total + item?.soluong * Number(item?.price)

  // }, 0)
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    getCart.forEach((product) => {
      if (selectedProducts[product.product_id]) {
        // totalPrice += product.price * product.soluong;
        totalPrice +=
          product.price * (quantities[product.product_id] || product.soluong);
      }
    });

    return totalPrice;
  };

  // const calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   getCart.reduce((total, item) => {
  //     if (selectedProducts[item]) {
  //       totalPrice += item?.soluong * Number(item?.price)
  //     }
  //   });
  //   return totalPrice;
  // };

  const [totalPrice, setTotalPrice] = useState(0);

  //Effect để cập nhật tổng tiền khi có thay đổi trong các sản phẩm đã chọn
  // useEffect(() => {
  //   const newTotalPrice = calculateTotalPrice();
  //   setTotalPrice(newTotalPrice);
  // }, [selectedProducts]);
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [selectedProducts, quantities]);

  const showQuantityExceededAlert1 = () => {
    // Hiển thị thông báo
    alert("Số lượng bạn nhập vượt quá số lượng sản phẩm sẵn có");
  };
  const showQuantityExceededAlert2 = () => {
    // Hiển thị thông báo
    alert("Vui lòng nhập số lượng sản phẩm từ lớn hơn hoặc bằng 1");
  };

  const onChangeInput = (item) => (ev) => {
    let newQuantity = Math.max(0, parseInt(ev.target.value));
    if (isNaN(newQuantity) || newQuantity < 1) {
      showQuantityExceededAlert2();
      newQuantity = 1;
    } else if (newQuantity > item.quantity) {
      showQuantityExceededAlert1();
      newQuantity = item.quantity;
    }
    setQuantities({ ...quantities, [item.product_id]: newQuantity });
    dispatch(changeQuantity({ ...item, soluong: newQuantity }));
    // dispatch(changeQuantity({ ...item, soluong: ev.target.value }))
  };

  // const onChangeQuantity = (type, item) => () => {
  //   if (type === 'increase') {
  //     dispatch(changeQuantity({ ...item, soluong: Number(item?.soluong) + 1 }));
  //   } else {
  //     dispatch(changeQuantity({ ...item, soluong: Number(item?.soluong) >= 1 ? Number(item?.soluong) - 1 : 0 }));
  //   }
  // }

  const onChangeQuantity = (type, item) => () => {
    if (type === "increase") {
      quantities[item.product_id] = item.soluong;
      console.log("quantities[item.product_id]", quantities[item.product_id]);
      // let newQuantity = quantities[item.product_id];
      let newQuantity = quantities[item.product_id]
        ? quantities[item.product_id] + 1
        : 1;

      if (newQuantity > item.quantity) {
        showQuantityExceededAlert1();
        newQuantity -= 1;
      }
      setQuantities({ ...quantities, [item.product_id]: newQuantity });
      dispatch(changeQuantity({ ...item, soluong: newQuantity }));
    } else {
      // const newQuantity = Math.max(0, quantities[item._id] ? quantities[item._id] - 1 : 0);
      quantities[item.product_id] = item.soluong;
      let newQuantity = quantities[item.product_id];
      if (quantities[item.product_id] <= 1) {
        showQuantityExceededAlert2();
        newQuantity = 1;
      } else {
        newQuantity = quantities[item.product_id] - 1;
      }

      setQuantities({ ...quantities, [item.product_id]: newQuantity });
      dispatch(changeQuantity({ ...item, soluong: newQuantity }));
    }
  };

  //Hàm xóa 1 sản phẩm
  const removeOneProduct = (item) => {
    dispatch(removeProduct(item));
    // Update quantities and selectedProducts after removal
    setQuantities({ ...quantities, [item.product_id]: 0 });
    setSelectedProducts({ ...selectedProducts, [item.product_id]: false });

    // Recalculate totalPrice
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  };

  // Hàm xóa tất cả sản phẩm khỏi giỏ hàng
  const removeAllProducts = () => {
    getCart.forEach((product) => {
      dispatch(removeProduct(product.product_id));
    });
    // Reset quantities and selectedProducts
    setQuantities({});
    setSelectedProducts({});

    // Recalculate totalPrice
    const newTotalPrice = 0; // Reset total price to 0
    setTotalPrice(newTotalPrice);
  };

  //Chọn tất cả checkbox trong cart-d2
  const selectAll = (checked) => {
    setSelectedProducts(
      getCart.reduce((acc, product) => {
        acc[product.product_id] = checked;
        return acc;
      }, {})
    ); // Create new selectedProducts object with all products set to checked
    setSelectAllChecked(checked); // Update state for select all checkbox
  };

  //Tich chon tat ca
  const onChange = (productId, e) => {
    const checked = e.target.checked;
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: checked,
    }));
  };

  //Chon cart-d2
  const onChangeCartCheckbox = (productId, e) => {
    const checked = e.target.checked;
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: checked,
    }));
  };

  useEffect(() => {
    // Update cart-d2 checkbox states based on select all checkbox
    if (selectAllChecked) {
      setSelectedProducts(
        getCart.reduce((acc, product) => {
          acc[product.product_id] = true;
          return acc;
        }, {})
      ); // Reset selectedProducts with all products checked
    }
  }, [selectAllChecked]); // Dependency array includes only selectAllChecked

  const handleSubmitOrder = () => {
    if (getCart.length > 0) navigate("/pay");
    else {
      notification.error({
        message: "Giỏ hàng trống !",
      });
    }
  };

  useEffect(() => {
    // Update selectAllCheckbox state based on individual checkboxes
    setSelectAllChecked(
      Object.values(selectedProducts).every((isChecked) => isChecked)
    ); // Check if all products are selected
  }, [selectedProducts]);

  //So luong
  //value trong usestate = value nguoi dung chon o buoc them vao gio hang
  //const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="cart">
        {getCart.length > 0 ? (
          <>
            <div className="cart-d1">
              <div className="cart-d1-column1">
                <p>Sản phẩm</p>
              </div>
              <div className="cart-d1-column2">
                <p>Số lượng</p>
              </div>
              <div className="cart-d1-column3">
                <p>Giá</p>
              </div>
              <div className="cart-d1-column4">
                <p>Thao tác</p>
              </div>
            </div>

            <div className="cart-d2">
              {getCart &&
                getCart.map((product, index) => (
                  <div className="cart-d2-row" key={product.product_id}>
                    <div className="cart-d2-row-column1">
                      <Checkbox
                        onChange={(e) =>
                          onChangeCartCheckbox(product.product_id, e)
                        }
                        checked={selectedProducts[product.product_id]}
                      ></Checkbox>
                    </div>
                    <div className="cart-d2-row-column2">
                      <img
                        src={product.images[0].image_url}
                        alt={product.product_name}
                      />
                    </div>
                    <div className="cart-d2-row-column3">
                      <p>{product.product_name}</p>
                    </div>
                    <div className="cart-d2-row-column4">
                      <button
                        className="cart-d2-row-column4-decrease"
                        onClick={onChangeQuantity("reduce", product)}
                      >
                        -
                      </button>
                      <input
                        className="cart-d2-row-column4-count"
                        type="text"
                        value={product?.soluong}
                        onChange={onChangeInput(product)}
                      ></input>

                      <button
                        className="cart-d2-row-column4-increase"
                        onClick={onChangeQuantity("increase", product)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-d2-row-column5">
                      <p>{product.price * product.soluong}đ</p>
                    </div>
                    <div className="cart-d2-row-column6">
                      <button
                        onClick={() => removeOneProduct(product.product_id)}
                      >
                        <p>Xóa</p>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <Empty description="Chưa có sản phẩm nào trong giỏ hàng!">
              <Button type="primary" onClick={() => navigate("/home")}>
                Mua ngay
              </Button>
            </Empty>
          </>
        )}
      </div>

      <div className="final">
        <div className="final-row1">
          <div className="final-row1-column1">
            <Checkbox
              checked={selectAllChecked}
              onChange={(e) => selectAll(e.target.checked)}
            ></Checkbox>
          </div>
          <div className="final-row1-column2">
            <p>Chọn tất cả</p>
          </div>
          <div className="final-row1-column3">
            {/* <input
              type="checkbox"
              onChange={removeAllProducts}
              className="custom-checkbox"
            /> */}
            <Checkbox onChange={removeAllProducts}></Checkbox>
          </div>
          <div className="final-row1-column4">
            <p>Xóa tất cả</p>
          </div>
          <div className="final-row1-column5">
            <p>Tổng thanh toán:</p>
          </div>
          <div className="final-row1-column6">
            {/* Tinh tong */}
            <p>{totalPrice}đ</p>
          </div>
          <div className="final-row1-column7">
            {/* <Link to="/pay"> */}
            <button onClick={handleSubmitOrder}>
              <p>Mua hàng</p>
            </button>
            {/* </Link> */}
          </div>
        </div>
        <div className="final-row2">
          <button onClick={() => navigate("/home")}>
            <p>Tiếp tục mua hàng</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
