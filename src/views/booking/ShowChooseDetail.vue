<template>
    <div class="green">

        <div>這頁是用來確認選擇</div>
        <div>
            <div>

                <div>這裡是電影相關資訊</div>
                <div>這裡是票種相關資訊</div>
                <div>這裡是座位相關資訊</div>
            </div>
        </div>

    </div>
    <div class="d-flex">
        <RouterLink :to="{ name: 'choose-seat-link' }" class=" btn btn-info">上一頁</RouterLink>
        <button @click.prevent="submitBtn" class="ms-auto btn btn-info">結帳</button>
    </div>
</template>

<script setup>
import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
import useBookingStore from '@/stores/bookingStore';
import router from '@/router/router';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axiosInstance';
import { ref, onMounted } from 'vue';

const bookingStore = useBookingStore()

onMounted(() => {
    netSection();
});
function submitBtn() {
    Swal.fire({
        title: "Loading.....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    setTimeout(function () {
        Swal.close();
    }, 500);
    const form = document.getElementById('allPayAPIForm');
    // console.log('form', form);
    setTimeout(function () {
        form.submit();
    }, 500)
}
const returnData = ref({});
const netSection = async () => {
    const detail = {
        storeId: bookingStore.storeId,
        auditoriumScheduleId: bookingStore.auditoriumScheduleId,
        seats: bookingStore.selectedSeats,
    }
    const order = {
        memberId: bookingStore.memberId,
        movieId: bookingStore.movieId,
        /*movie name */
        totalAmount: bookingStore.totalAmount,
        orderDetail: detail,
        orderId: bookingStore.orderId,
    }
    try {
        const response = await axiosInstance.post("/api/orders/netSection", order);
        bookingStore.setOrderId(response)
        returnData.value = response.data;
        const green = document.querySelector(".green");
        green.innerHTML = returnData.value.data.netSection;
    } catch (error) {
        console.error("Error occurred while creating order:");
        Swal.fire({
            icon: "error",
            title: "創建訂單失敗",
            text: error.message || "未知錯誤",
        });
    }

    // router.push({ name: 'ticket-detail-link' }); // 成功后跳转
}

</script>

<style scoped></style>