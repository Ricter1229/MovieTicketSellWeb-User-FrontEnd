<template>
    <div>
        <h1>結帳成功</h1>
        <div>
            <div>電影名</div>
            <div>電影票日期</div>
            <div>影城</div>
            <div>座位</div>
            <div>票</div>
        </div>
    </div>
</template>

<script setup>
import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
import { onMounted } from 'vue';
import useBookingStore from '@/stores/bookingStore';

const bookingStore = useBookingStore()
const { changeOrderStatus } = useMemberBuyTicketOrderAPI()
const requestChangeOrderStatus = {
    "orderId": bookingStore.orderId,
    "status": "CANCELED"
}



</script>

<style lang="scss" scoped>

</style>