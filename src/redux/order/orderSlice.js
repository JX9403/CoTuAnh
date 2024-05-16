import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  carts: [], //thong tin cart
};
/*
    carts = [
        { quantity: 1, _id: 'abc',detail: {_id: 'abc', name: 'def'}},
        { quantity: 1, _id: '123',detail: {_id: '123', name: '456'}},
    ]

*/

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    doAddBookAction: (state, action) => {
      const isExist = state.carts.find(
        (item) => item.product_id === action.payload.product.product_id
      );
      console.log("action", action.payload.product.product_id);
      console.log("quantity:", action.payload.soluong);
      if (isExist) {
        state.carts = state.carts.map((item) => {
          // item.soluong = 0
          if (item.product_id === action.payload.product.product_id)
            item.soluong += action.payload.soluong;
          return item;
        });
        message.success("Success");
      } else {
        state.carts.push({
          ...action.payload.product,
          soluong: action.payload.soluong,
          
        });
        message.success("Success");
      }
    },
    removeCart: (state, action) => {
      state.carts?.splice(0, state.carts.length);
    },
    changeQuantity: (state, action) => {
      // console.log("dau het ca dau:", action.payload._id)
      state.carts = state.carts.map((item) => {
        // lặp qua các item trong list cart
        if (item.product_id === action.payload.product_id) {
          // nếu item mà nó lặp qua = với item mà mình gửi vào
          item.soluong = action.payload.soluong; // thì update quantity
        }
        return item;
      });
    },
    removeProduct: (state, action) => {
      // console.log("id:", action.payload);
      state.carts = state.carts.filter(
        (item) => item.product_id !== action.payload
      );
    },
    doPlaceOrderAction: (state, action) => {
      state.carts = [];
    },
    doAllCartById: (state, action) => {
      // console.log("check payload do all", action.payload);
      action.payload === null
        ? (state.carts = [])
        : (state.carts = action.payload);
    },
  },
});

export const {
  doAddBookAction,
  removeCart,
  changeQuantity,
  removeProduct,
  doPlaceOrderAction,
  doAllCartById,
} = orderSlice.actions;
export default orderSlice.reducer;
