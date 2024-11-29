import axios from "axios";
const path = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: path + '/api', // 后端基礎路徑
  timeout: 5000, // request 超時時間
})


// request 攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 可以在此處添加認證 Token，例如：
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);


// response 攔截器
axiosInstance.interceptors.response.use(
  (response) => response.data, // 直接返回 data
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);


export default axiosInstance;