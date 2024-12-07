<template>
    <div>
        <div>
            <h1>This is now ticket list</h1>
            <div>電影名</div>
            <div>時間</div>
            <div>幾張票</div>
            <div>詳細</div>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script setup>
import axiosInstance from '@/utils/axiosInstance';
import { onMounted, reactive } from 'vue';

const orderInfo = reactive([])

const getNowTicket = async () => {
    const request = {
        "memberId": 1,
        "action": "future"
    }

    const response = await axiosInstance.post("/api/orders/member/tickets", request)
    console.log(response)

    
}

onMounted(() => {
    getNowTicket()
})
</script>

<style scoped>

</style>