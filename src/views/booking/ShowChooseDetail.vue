<template>
    <div>這頁是用來確認選擇</div>
    <div>
        <div>這裡是電影相關資訊</div>
        <div>這裡是票種相關資訊</div>
        <div>這裡是座位相關資訊</div>

        <div class="d-flex">
            <RouterLink :to="{ name: 'choose-seat-link' }" class=" btn btn-info">上一頁</RouterLink>
            <button @click="newOrder" class="ms-auto btn btn-info">結帳</button>
        </div>
    </div>
</template>

<script setup>
    import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
    import useBookingStore from '@/stores/bookingStore';
    import router from '@/router/router';
    import Swal from 'sweetalert2';
    import axiosInstance from '@/utils/axiosInstance';

    const bookingStore = useBookingStore()
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
        }
        try {
            const responseData = (await axiosInstance.post("/api/orders/", order)).data.data
            bookingStore.setOrderId(responseData)
            router.push({ name: 'temp-money-link' }).catch(err => {
                console.error("Routing error:", err);
            }); // 成功后跳转
        } catch(error) {
            console.error("Error occurred while creating order:");
            Swal.fire({
                icon: "error",
                title: "創建訂單失敗",
                text: error.message || "未知錯誤",
            });
        }
    }
    
</script>

<style scoped>

</style>