<template>
    <div>這頁是用來確認選擇</div>
    <div>
        <div class="green">

            <div>這裡是電影相關資訊</div>
            <div>這裡是票種相關資訊</div>
            <div>這裡是座位相關資訊</div>
        </div>

        <div class="d-flex">
            <RouterLink :to="{ name: 'choose-seat-link' }" class=" btn btn-info">上一頁</RouterLink>
            <button @click="submitBtn" class="ms-auto btn btn-info">結帳</button>
        </div>
    </div>
</template>

<script setup>
    import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
    import useBookingStore from '@/stores/bookingStore';
    import router from '@/router/router';
    import Swal from 'sweetalert2';
    import axiosInstance from '@/utils/axiosInstance';
    import {ref,onMounted} from 'vue';

    const bookingStore = useBookingStore()
    
    onMounted(() => {
    newOrder();
     Swal.fire({
        title: "Loading.....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    setTimeout(function() {
    
    //   if (form) {
        Swal.close();
        // form.submit();
    //   }
                }, 500);
});
function submitBtn(){
    const form = document.getElementById('allPayAPIForm');
    console.log('form',form);
    
    setTimeout(function() {
    

        form.submit();
     
                }, 500)
}
const returnData=ref({});
    const newOrder = async () => {
        const detail = {
            storeId: bookingStore.storeId,
            auditoriumScheduleId: bookingStore.auditoriumScheduleId,
            seats: bookingStore.selectedSeats,
        }
        const order = {
            memberId: bookingStore.memberId,
            movieId: bookingStore.movieId,
            totalAmount: bookingStore.totalAmount,
            orderDetail: detail, 
            orderId: bookingStore.orderId,
            orderId: bookingStore.orderId,
        }
       
        try {
            console.log("114114");
            const response = await axiosInstance.post("/api/orders/", order);
            console.log("114114");
            console.log("response",response);
            console.log("response.data",response.data);
            bookingStore.setOrderId(response)
            returnData.value = response.data;
            console.log("returnData.value",returnData.value);
                const green=document.querySelector(".green");
                console.log("green",green);
                console.log("returnData.value.data.netSection",returnData.value.data.netSection);
                green.innerHTML=returnData.value.data.netSection;
            }catch(error) {
                console.error("Error occurred while creating order:");
                Swal.fire({
                    icon: "error",
                    title: "創建訂單失敗",
                    text: error.message || "未知錯誤",
                });
            }
        
            // router.push({ name: 'ticket-detail-link' }); // 成功后跳转
    }
    
    
    
    // async () => {
    //     const detail = {
    //         storeId: bookingStore.storeId,
    //         auditoriumScheduleId: bookingStore.auditoriumScheduleId,
    //         seats: bookingStore.selectedSeats,
    //     }
    //     const order = {
    //         memberId: bookingStore.memberId,
    //         movieId: bookingStore.movieId,
    //         totalAmount: bookingStore.totalAmount,
    //         orderDetail: detail, 
    //         orderId: bookingStore.orderId,
    //     }
    //     try {
    //         const responseData = (await axiosInstance.post("/api/orders/", order)).data.data
    //         bookingStore.setOrderId(responseData)
    //         router.push({ name: 'temp-money-link' }).catch(err => {
    //             console.error("Routing error:", err);
    //         }); // 成功后跳转
    //     } catch(error) {
    //         console.error("Error occurred while creating order:");
    //         Swal.fire({
    //             icon: "error",
    //             title: "創建訂單失敗",
    //             text: error.message || "未知錯誤",
    //         });
    //     }
    // }
    
</script>

<style scoped>

</style>