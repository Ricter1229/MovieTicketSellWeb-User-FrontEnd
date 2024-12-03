import { createOrder } from "@/api/booking/memberBuyTicketOrderAPI.js";
import { reactive, ref } from "vue";
import useBookingStore from "@/stores/bookingStore";

export function useMemberBuyTicketOrderAPI() {
    const bookingStore = useBookingStore()
    const order = ref(null)
    const orderList = reactive({data: []})

    const newOrder = async (requestMemberBuyTicketOrder) => {
        try {
            order.data = (await createOrder(requestMemberBuyTicketOrder)).data.data   
            bookingStore.setOrderId(order.data)
        } catch (error) {
            console.error("Error fetching order data:");
            throw error; // 抛出错误以便组件处理
        }
    }

    // const changeOrderStatus = async (request) => {
    //     try {
    //         console.log("changeOrderStatus", request);
            
    //         const a = await updateOrderStatus(request)
    //         console.log("561894564546",a);
    //     } catch (error) {
    //         console.error("Error to change order status:", error);
    //         throw error; // 抛出错误以便组件处理
    //     }
    // }
    
    return {
        order,
        newOrder,
        // changeOrderStatus,
    }
}