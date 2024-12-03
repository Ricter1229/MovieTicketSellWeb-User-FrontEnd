import axios from "axios";
const path = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: path, // 后端基礎路徑
  timeout: 5000, // request 超時時間
  headers: { "Content-Type": "application/json" },
})

// response 攔截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response; // 解包 response.data
    // 检查 code 是否为成功状态（根据业务逻辑）
    // if (data.code !== 200 && data.code !== '') {
    //   console.error('API Error:', data);
    //   return Promise.reject(new Error(data.message || 'Unknown Error'));
    // }
    console.log(data.code);
    
    // 正常返回 data.data（即最终需要的核心数据）
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // 處理 403 錯誤
      if (status === 403) {
        console.error("Access Denied:", data?.errorDetail || "403 Forbidden");
        window.location.href = "/403"; // 跳轉到權限不足頁面
      }

      // 其他錯誤處理
      console.error("API Error:", data || error.message);
      return Promise.reject(error);
    }
    // 處理網絡錯誤或其他未知錯誤
    console.error("Network/Unknown Error:", error.message);
    return Promise.reject(error);
  }
);


export default axiosInstance;