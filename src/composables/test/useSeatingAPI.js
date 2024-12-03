import { getSeat } from "@/api/test/seatingAPI";
import axiosInstance from "@/utils/axiosInstance";
import { reactive } from "vue";
export function useSeating() {
    const seatingList = reactive({data: null})
    const soldSeats = reactive([])
    const seatingListRequest = async () => {
        try {
            seatingList.data = (await getSeat()).data;
        } catch (error) {
            console.error("Error fetching seating data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }
    
    const getSoldSeatsRequest =  request => {
        try {
            soldSeats.values = axiosInstance.get("/api/seats/sold",request).data
        } catch(error) {
            throw error
        }
    }
    return {
        seatingList,
        seatingListRequest,
        getSoldSeatsRequest
    }
}