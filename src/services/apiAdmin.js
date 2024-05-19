import apiClient from "../utils/axios";
import axios from "../utils/axios";

// Call manager Client
export const callFetchListClient = async (query) => {
  const res = await axios.get(`/api/v1/managementUser/clients/${query}`);
  return res;
};

export const callCreateClient = (
  full_name,
  email,
  password,
  phone_number,
  role,
  address,
  date_of_birth,
  avatar
) => {
  return axios.post("/api/v1/managementUser/insert", {
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

export const callUpdateClient = (
  id,
  full_name,
  email,
  password,
  phone_number,
  role,
  address,
  date_of_birth,
  avatar
) => {
  return axios.put(`/api/v1/managementUser/${id}`, {
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

export const callDeleteClient = (id) => {
  return axios.delete(`/api/v1/managementUser/${id}`);
};

// End manager Client


// Manager Staff
export const callFetchListStaff = async (query) => {
  const res = await axios.get(`/api/v1/managementUser/staffs/${query}`);
  return res;
};

export const callCreateStaff = (
  full_name,
  email,
  password,
  phone_number,
  role,
  address,
  date_of_birth,
  avatar
) => {
  return axios.post("/api/v1/managementUser/insert", {
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

export const callUpdateStaff = (
  id,
  full_name,
  email,
  password,
  phone_number,
  role,
  address,
  date_of_birth,
  avatar
) => {
  return axios.put(`/api/v1/managementUser/${id}`, {
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

export const callDeleteStaff = (id) => {
  return axios.delete(`/api/v1/managementUser/${id}`);
};

//End Manager Staff

//Manage Product

export const callGetListProduct = (query) => {
  return axios.get(`/api/v1/products${query}`)
}


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


// Call manager Order
export const callFetchListOrder = async (query) => {
  const res = await axios.get(`/api/v1/orders/getAllOrder${query}`);
  return res;
};


export const callUpdateOrder = (
  id,
  payment_status,
  status
) => {
  return axios.put(`/api/v1/orders/update/${id}`, {
    payment_status,
    status
  });
};

export const callDeleteOrder = (id) => {
  return axios.delete(`/api/v1/orders/${id}`);
};

// End manager Order