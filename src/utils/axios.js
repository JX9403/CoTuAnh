import axios from 'axios'

const apiClient = axios.create({
  baseURL :'https://backend-online-supermarket-sales-website.onrender.com/',

});

//apiClient.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function(config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

setClientToken(localStorage.getItem('access_token'))


export default apiClient;

//code lấy api user từ token
// const token = localStorage.getItem("access_token"); 
// setClientToken(token);
// apiClient
//   .get("/api/v1/users/details")
//   .then((response) => {
//     console.log("Thông tin người dùng:", response.data.data);
//     dispatch(doLoginAction(response.data.data));
//   })
//   .catch((error) => {
//     console.error("Lỗi khi lấy thông tin người dùng:", error);
//   });




// import axios from "axios";

// const baseUrl = 'https://backend-online-supermarket-sales-website.onrender.com/';

// const apiClient = axios.create({
//     baseURL: baseUrl,
//     // lưu token vào cookies
//     withCredentials: true,
// });
// export const setClientToken = (token) => {
//   apiClient.interceptors.request.use(async function(config) {
//     config.headers.Authorization = "Bearer " + token;
//     return config;
//   });
// };

// setClientToken(localStorage.getItem('access_token'))

// // apiClient.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

// // const handleRefreshToken = async () => {
// //     const res = await apiClient.get('/api/v1/auth/refresh');
// //     if (res && res.data) return res.data.access_token;
// //     else null;
// // }

// // Add a request interceptor
// apiClient.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// const NO_RETRY_HEADER = 'x-no-retry'

// // Add a response interceptor
// apiClient.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response && response.data ? response.data : response;
// }, async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error.config && error.response
//         && +error.response.status === 401
//         && !error.config.headers[NO_RETRY_HEADER]
//     ) {
//         const access_token = localStorage.getItem('access_token');
//         error.config.headers[NO_RETRY_HEADER] = 'true'
//         if (access_token) {
//             error.config.headers['Authorization'] = `Bearer ${access_token}`;
//             localStorage.setItem('access_token', access_token)
//             return apiClient.request(error.config);
//         }
//     }

//     //NOTE DANGER
//     // if (
//     //     error.config && error.response
//     //     && +error.response.status === 400
//     //     && error.config.url === '/api/v1/auth/refresh'
//     // ) {
//     //     window.location.href = '/';
//     // }

//     return error?.response?.data ?? Promise.reject(error);
// });

// export default apiClient;