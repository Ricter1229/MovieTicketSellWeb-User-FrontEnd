import axios from '@/utils/axiosInstance';
import { ref } from 'vue';

const API_BASE_URL = '/auditorium';

export const getSeat = async () => {
    const request =
        {
            "auditoriumId": 1
        }
    const data = (await axios.post(API_BASE_URL + "/getSeatingList", request)).data;
    console.log(data);
    
    return data
};

export const getSoldSeats = async (request) => {
    return axios.get("/api/seats/sold",request).data
}
