import apiClient, { setClientToken } from "../utils/axios";
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
  return apiClient.get("/api/v1/users/details");
};

export const callUpdateInfo = (full_name, email, date_of_birth, address ) => {
  return axios.put("/api/v1/users/details", {full_name, email, date_of_birth, address });
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
  mainText,
  author,
  price,
  category,
  quantity,
  sold,
  thumbnail,
  slider
) => {
  return axios.post("/api/v1/book", {
    mainText,
    author,
    price,
    category,
    quantity,
    sold,
    thumbnail,
    slider,
  });
};

export const callUpdateProduct = (_id, fullName, phone) => {
  return axios.put("/api/v1/book", { _id, fullName, phone });
};

export const callDeleteProduct = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callUploadProductImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

// End call manager product

// Call  manage product
export const callFetchListOrder = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};


export const callProductImg = (img) => {
  return axios.get(`/api/v1/productImage/${img}`);
}