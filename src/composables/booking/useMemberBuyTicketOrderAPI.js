import { createOrder } from "@/api/booking/memberBuyTicketOrderAPI.js";
import { reactive, ref } from "vue";

export function useMemberBuyTicketOrderAPI() {
    const order = ref(null)
    const orderList = reactive({data: []})

    const newOrder = async (requestMemberBuyTicketOrder) => {
        try {
            console.log("requestMemberBuyTicketOrder",requestMemberBuyTicketOrder)
            order.data = (await createOrder(requestMemberBuyTicketOrder)).data 
            console.log(order.data);
                    
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }
    
    return {
        order,
        newOrder,
    }
}