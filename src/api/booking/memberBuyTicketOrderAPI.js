import axios from '@/utils/axiosInstance';

const API_BASE_URL = '/orders';

export const createOrder = (data) => {
    return axios.post(API_BASE_URL + "/", data);
};

