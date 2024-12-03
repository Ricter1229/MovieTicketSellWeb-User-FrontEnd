<template>
    <div>
        <h1>我是臨時結帳頁面</h1>
        <div class="d-flex">
            <RouterLink :to="{ name: 'check-choose-deatil-link' }" class=" btn btn-info">上一頁</RouterLink>
            <button @click="changeOrderStatus" class="ms-auto btn btn-info">結帳成功</button>
        </div>
    </div>
</template>

<script setup>
    import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
    import router from '@/router/router';
    import useBookingStore from '@/stores/bookingStore';
    import axiosInstance from '@/utils/axiosInstance';
    import Swal from 'sweetalert2';
    const bookingStore = useBookingStore()
    
    const changeOrderStatus = async () => {
        const request = {
            "orderId": bookingStore.orderId,
            "status": "PAID"
        }
        console.log("132",request);
        
        try {
            await axiosInstance.put("/api/orders/status", request)
            router.push({ name: 'ticket-detail-link' }); // 成功后跳转
        } catch(error) {
            console.error("Error while set order paid", error);
            Swal.fire({
                icon: "error",
                title: "購買票券失敗",
                text: error.message || "未知錯誤",
            });
        }
    }
</script>

<style scoped>

</style>