<template>
    <!-- 右側購物車 -->
    <div class="shopping-cart-container p-3">
        <h1 class="mb-4">購物車</h1>

        <!-- 票券卡片 -->
        <div class="mb-4">
            <MovieTicketCard></MovieTicketCard>
        </div>

        <!-- 票券部分 -->
        <div class="ticket-section mb-3" v-if="bookingStore.selectedTickets.length != 0">
            <h2 class="fw-bold mb-3">你的票券</h2>
            <div v-for="ticket in bookingStore.selectedTickets" :key="ticket.name" class="ticket-item d-flex justify-content-between mb-2">
                <div class="ticket-name">{{ ticket.name }}</div>
                <div class="ticket-quantity">{{ ticket.quantity }} 張</div>
            </div>
        </div>

        <!-- 座位部分 -->
        <div class="seat-section" v-if="bookingStore.selectedSeats.length != 0">
            <h2 class="fw-bold mb-3">你的座位</h2>
            <div class="seat-item d-flex flex-wrap">
                <div v-for="seat in bookingStore.selectedSeats" :key="seat" class="seat me-2">
                    {{ seat }}
                </div>
            </div>
        </div>
        <!-- 總金額部分 -->
        <div class="seat-section" v-if="bookingStore.totalAmount != 0">
            <h2 class="fw-bold mb-3">總金額</h2>
            <div class="ticket-name d-flex flex-wrap">
                <div class="">
                    {{ bookingStore.totalAmount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MovieTicketCard from './MovieTicketCard.vue';
import useBookingStore from '@/stores/bookingStore';
const bookingStore = useBookingStore()
</script>

<style scoped>
.shopping-cart-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    max-width: 400px;
}

.ticket-section,
.seat-section {
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
}

.ticket-item {
    font-size: 16px;
    line-height: 1.5;
}

.ticket-name {
    flex: 1;
    font-weight: bold;
}

.ticket-quantity {
    text-align: right;
    min-width: 50px;
    color: #666;
}

.seat-item {
    font-size: 14px;
    background-color: #eee;
    padding: 5px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    color: #333;
}
</style>
