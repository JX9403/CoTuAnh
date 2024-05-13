import apiClient from "../utils/axios";
import axios from "../utils/axios";

// Call manager Client
export const callFetchListClient = async () => {
  const res = await axios.get(`/api/v1/managementUser/clients`);
  return res;
};

export const callCreateClient = (fullName, password, email, phone) => {
  return axios.post("/api/v1/Client", { fullName, password, email, phone });
};

export const callUpdateClient = (_id, fullName, phone) => {
  return axios.put("/api/v1/Client", { _id, fullName, phone });
};

export const callDeleteClient = (id) => {
  return axios.delete(`/api/v1/Client/${id}`);
};

// End manager Client

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
