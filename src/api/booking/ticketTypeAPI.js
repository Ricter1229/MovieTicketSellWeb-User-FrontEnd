import axios from '@/utils/axiosInstance';

const API_BASE_URL = '/ticketType';

export const getAllTicketType = () => {
    return axios.post(API_BASE_URL + "/findAll");
};
