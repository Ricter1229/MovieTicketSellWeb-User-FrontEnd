import axios from '@/utils/axiosInstance';

const API_BASE_URL = '/api/orders';

export const createOrder = (data) => {
    return axios.post(API_BASE_URL + "/", data);
};

// export const updateOrderStatus = (data) => {
//     console.log("updateOrderStatus",data);
    
//     return ;
// };
