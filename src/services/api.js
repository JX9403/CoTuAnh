import apiClient from "../utils/axios";
import axios from "../utils/axios";

export const callRegister = (
  full_name,
  email,
  password,
  phone_number,
  role,
  address,
  date_of_birth,
  avatar
) => {
  return axios.post("/api/v1/users/register", {
    full_name,
    email,
    password,
    phone_number,
    role,
    address,
    date_of_birth,
    avatar,
  });
};

export const callLogin = (phone_number, password) => {
  return axios.post("/api/v1/users/login", { phone_number, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/users/details");
};

export const callUpdateInfo = async (updatedUserData) => {
  console.log("check data gửi sang call api", updatedUserData);
  const { full_name, email, date_of_birth, address } = updatedUserData;
  const response = await axios.put("/api/v1/users/details", {
    full_name,
    email,
    date_of_birth,
    address,
  });
  console.log("check data sau khi call api", response);
  return response;
};

export const callChangePassword = async (password, new_password) => {
  console.log("check data change pass gui len api", { password, new_password });
  const res = await axios.put("/api/v1/users/details/change-password", {
    password,
    new_password,
  });
  // console.log("check res change pass", res);
  return res;
};

export const callListOrder = () => {
  return axios.get("/api/v1/orders/history");
};

export const callFetchOrderDetails = (id) => {
  return axios.get(`/api/v1/orders/${id}`);
};

// Call manager user
export const callFetchListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const callCreateUser = (fullName, password, email, phone) => {
  return axios.post("/api/v1/user", { fullName, password, email, phone });
};

export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};
// End manager user

export const callFetchCategory = () => {
  return axios.get(`/api/v1/categories`);
};

export const callFetchListProduct = (query) => {
  return axios.get(`/api/v1/products?${query}`);
};

export const callCreateProduct = (
  product_name,
  price,
  unit,
  category_id,
  description,
  quantity
) => {
  return axios.post("/api/v1/products", {
    product_name,
    price,
    unit,
    category_id,
    description,
    quantity,
  });
};

export const callUpdateProduct = (id, product_name, price, unit, category_id, description, quantity) => {
  return axios.put(`/api/v1/products/${id}`, { product_name, price, unit, category_id, description, quantity});
};

export const callDeleteProduct = (id) => {
  return axios.delete(`/api/v1/products/${id}`);
};


// End call manager product

// Call  manage product
export const callFetchListOrder = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callProductImg = (img) => {
  return axios.get(`/api/v1/productImage/${img}`);
};

export const callCommentProduct = async (comment) => {
  console.log("check data gửi sang call api", comment);
  const { user_id, product_id, content, star } = comment;
  console.log({ user_id, product_id, content, star });
  const response = await axios.post("/api/v1/comments", {
    user_id,
    product_id,
    content,
    star,
  });
  // console.log("check data sau khi call api", response);
  return response;
};

export const callPlaceOrder = async (data) => {
  const {
    user_id,
    payment_method,
    payment_status,
    shipping_address,
    shipping_date,
    order_details,
  } = data;

  console.log("check data nhan duoc ", data);
  const response = await axios.post("/api/v1/orders", {
    user_id,
    payment_method,
    payment_status,
    shipping_address,
    shipping_date,
    order_details,
  });
  return response;
};

export const callProductById = (id) => {
  return axios.get(`/api/v1/products/${id}`);
};
