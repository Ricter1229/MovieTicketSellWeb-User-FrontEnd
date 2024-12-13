<template>
    <div class="container">
        <h1 class="title">票券管理</h1>
        <div class="box-container">
            <!-- 切换按钮 -->
            <div class="btn-container">
                <button @click="clickFuture" class="btn" :class="{ active: action === 'future' }">未過期</button>
                <button @click="clickPast" class="btn" :class="{ active: action === 'past' }">過期</button>
            </div>
            <!-- 票券列表 -->
            <div class="ticket-list">
                <h2 v-if="action === 'future'">未過期票券</h2>
                <h2 v-else>已過期票券</h2>
                <div class="ticket-header">
                    <span>電影名</span>
                    <span>電影場次時間</span>
                    <span>張數</span>
                    <span>購票時間</span>
                    <span>操作</span>
                </div>
                <div v-if="orderInfos.length !== 0" class="ticket-content">
                    <div v-for="orderInfo in orderInfos" :key="orderInfo.orderId" class="ticket-row">
                        <span>{{ orderInfo.movieName }}</span>
                        <span>{{ orderInfo.schedule }}</span>
                        <span>{{ orderInfo.orderDetailCount }} 張票</span>
                        <span>{{ orderInfo.orderCreateTime }}</span>
                        <button class="detail-btn">查看詳情</button>
                    </div>
                </div>
                <div v-else class="no-data">暫無票券資料</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosInstance from '@/utils/axiosInstance';
import { onMounted, reactive, ref } from 'vue';
import useUsersStore from '@/store/users';
// 响应式数据
const orderInfos = reactive([]);
const action = ref("future");
const userStore = useUsersStore()
// 获取票券数据
const getNowTicket = async () => {
    const request = {
        memberId: userStore.id,
        action: action.value,
    };
    console.log(request);
    
    const response = await axiosInstance.post("/api/orders/member/tickets", request);
    console.log(response);
    orderInfos.splice(0, orderInfos.length, ...response.data.data);
    
};

// 切换到未过期
const clickFuture = () => {
    action.value = "future";
    getNowTicket();
};

// 切换到过期
const clickPast = () => {
    action.value = "past";
    getNowTicket();
};

// 页面加载时获取数据
onMounted(() => {
    getNowTicket();
});

</script>

<style scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    color: #333;
}

.title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #007bff;
}

.box-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
}

.btn {
    padding: 10px 20px;
    border: 1px solid #007bff;
    border-radius: 4px;
    background-color: white;
    color: #007bff;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
    background-color: #007bff;
    color: white;
}

.btn.active {
    background-color: #0056b3;
    color: white;
    border-color: #0056b3;
}

.ticket-list {
    margin-top: 20px;
}
.ticket-header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 1fr; /* 增加 "購票時間" 列宽度 */
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    text-align: center; /* 文本居中 */
}

.ticket-content .ticket-row {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 1fr; /* 增加 "購票時間" 列宽度 */
    padding: 10px 0;
    align-items: center;
    border-bottom: 1px solid #eee;
    text-align: center; /* 文本居中 */
}

.ticket-content .ticket-row:hover {
    background-color: #f1f1f1;
}

.detail-btn {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center; /* 按钮居中 */
}

.detail-btn:hover {
    background-color: #0056b3;
}


.no-data {
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-style: italic;
}
</style>