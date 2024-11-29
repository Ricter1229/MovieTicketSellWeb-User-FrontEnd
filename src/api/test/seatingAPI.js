import axios from '@/utils/axiosInstance';
import { ref } from 'vue';

const API_BASE_URL = '/Auditorium';

export const getSeat = () => {
    const request =
        {
            "auditoriumId": 1
        }
    const data = axios.post(API_BASE_URL + "/getSeatingList", request);
    console.log(data);
    
    return data
};
