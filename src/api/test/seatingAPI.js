import axios from '@/utils/axiosInstance';

const API_BASE_URL = '/Auditorium';

export const getSeat = () => {
    return axios.post(API_BASE_URL + "/insertSeatingList");
};
