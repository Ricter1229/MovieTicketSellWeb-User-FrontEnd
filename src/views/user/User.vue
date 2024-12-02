<template>
    <div class="user-container">
        <h2>使用者資料</h2>
        <div v-if="user">
            <p><strong>名稱：</strong>{{ user.account }}</p>
            <p><strong>電子郵件：</strong>{{ user.email }}</p>
            <p><strong>帳號：</strong>{{ user.account }}</p>
            <p><strong>生日：</strong>{{ user.birthDate }}</p>
            <p><strong>電話：</strong>{{ user.phone }}</p>
        </div>
        <div v-else>
            <p>載入中...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        user.value = userData;
    } else {
        console.error('No user data found in sessionStorage');
    }
});
</script>

<style scoped>
.user-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    color: #333;
}

.user-details {
    margin-top: 20px;
}

.user-details p {
    font-size: 16px;
    line-height: 1.5;
    color: #555;
}

.user-details strong {
    color: #000;
}
</style>