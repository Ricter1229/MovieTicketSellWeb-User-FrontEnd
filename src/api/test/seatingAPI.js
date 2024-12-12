import axios from '@/utils/axiosInstance';
import { ref } from 'vue';
import useBookingStore from '@/stores/bookingStore';

const bookingStore = useBookingStore()
const API_BASE_URL = '/api/Auditorium';
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