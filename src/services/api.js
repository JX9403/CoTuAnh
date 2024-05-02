import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
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
  return axios.get(`/api/v1/database/category`);
};

export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

// Call  manage product
export const callFetchListProduct = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callCreateProduct = (
  mainText,
  author,
  price,
  category,
  quantity,
  sold,
  thumbnail, slider
) => {
  return axios.post("/api/v1/book", {
    mainText,
    author,
    price,
    category,
    quantity,
    sold,
    thumbnail, slider
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